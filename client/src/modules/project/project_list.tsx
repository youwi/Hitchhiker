import React from 'react';
import { Menu, Tooltip, Button, Modal } from 'antd';
import { SelectParam } from 'antd/lib/menu';
import ProjectItem from './project_item';
import ProjectDataDialog from './project_data_dialog';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DtoProject } from '../../../../server/src/interfaces/dto_project';
import { StringUtil } from '../../utils/string_util';
import { DtoUser } from '../../../../server/src/interfaces/dto_user';
import { ProjectFiles } from '../../../../server/src/interfaces/dto_project_data';
import { newProjectName } from '../../common/constants';
import Editor from '../../components/editor';
import { ProjectFileTypes, ProjectFileType } from '../../common/custom_type';
import * as _ from 'lodash';

interface ProjectListProps {

    user: DtoUser;

    projects: DtoProject[];

    activeProject: string;

    projectFiles: ProjectFiles;

    disbandProject(project: DtoProject);

    quitProject(project: DtoProject);

    updateProject(project: DtoProject);

    createProject(project: DtoProject);

    selectProject(projectId: string);

    saveGlobalFunc(projectId: string, globalFunc: string);

    deleteFile(pid: string, name: string, type: ProjectFileType);

    addFile(pid: string, name: string, path: string, type: ProjectFileType);
}

interface ProjectListState {

    isGlobalFuncDlgOpen: boolean;

    isProjectFileDlgOpen: boolean;

    currentOperatedProject?: string;

    globalFunc: string;

    projectFileType: ProjectFileType;
}

const createDefaultProject = (user: DtoUser) => {
    return {
        id: StringUtil.generateUID(),
        name: newProjectName,
        owner: user,
        members: [user],
        swaggerUrl:"",
        shared:false
    };
};

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {

    private currentNewProject: DtoProject | undefined;
    private projectRefs: _.Dictionary<ProjectItem> = {};

    constructor(props: ProjectListProps) {
        super(props);
        this.state = {
            isGlobalFuncDlgOpen: false,
            isProjectFileDlgOpen: false,
            globalFunc: '',
            projectFileType: ProjectFileTypes.data
        };
    }

    componentDidUpdate(prevProps: ProjectListProps, prevState: ProjectListState) {
        if (this.currentNewProject && this.projectRefs[this.currentNewProject.id]) {
            this.projectRefs[this.currentNewProject.id].edit();
            this.currentNewProject = undefined;
        }
    }

    private getProject = (id: string) => {
        return this.props.projects.find(p => p.id === id);
    }

    private getProjectGlobalFunc = (id: string) => {
        const project = this.getProject(id);
        return project ? project.globalFunction || '' : '';
    }

    private onSelectChanged = (param: SelectParam) => {
        this.props.selectProject(param.item.props.data.id);
    }

    private changeProjectName = (name: string, project: DtoProject) => {
        if (name.trim() !== '' && name !== project.name) {
            project.name = name;
            this.props.updateProject(project);
        }
    }

    private createProject = () => {
        const newProject = createDefaultProject(this.props.user);
        this.currentNewProject = newProject;
        this.props.createProject(newProject);
    }

    private saveGlobalFunc = () => {
        const { currentOperatedProject, globalFunc } = this.state;
        if (!currentOperatedProject) {
            return;
        }
        this.props.saveGlobalFunc(currentOperatedProject, globalFunc);
        this.setState({ ...this.state, isGlobalFuncDlgOpen: false, globalFunc: '' });
    }

    private get globalFuncDialog() {
        const { isGlobalFuncDlgOpen } = this.state;
        const project = this.getProject(this.state.currentOperatedProject || '');
        return (
            <Modal
                title={`${project ? project.name + ': ' : ''}Global Function of Tests`}
                visible={isGlobalFuncDlgOpen}
                maskClosable={false}
                okText="Save"
                width={800}
                cancelText="Cancel"
                onOk={this.saveGlobalFunc}
                onCancel={() => this.setState({ ...this.state, isGlobalFuncDlgOpen: false, globalFunc: '' })}
            >
                <Editor type="javascript" height={600} fixHeight={true} value={this.state.globalFunc} onChange={v => this.setState({ ...this.state, globalFunc: v })} />
            </Modal>
        );
    }

    private get ProjectLibDialog() {
        const { isProjectFileDlgOpen, currentOperatedProject, projectFileType } = this.state;
        return (
            <ProjectDataDialog
                projectId={currentOperatedProject || ''}
                type={projectFileType}
                projectFiles={this.props.projectFiles}
                isDlgOpen={isProjectFileDlgOpen}
                title={projectFileType === ProjectFileTypes.lib ? 'Project Lib' : 'Project Data'}
                deleteFile={(pid, name, type) => this.props.deleteFile(pid, name, type)}
                addFile={(pid, name, path, type) => this.props.addFile(pid, name, path, type)}
                onClose={() => this.setState({ ...this.state, isProjectFileDlgOpen: false })}
            />
        );
    }

    public render() {
        return (
            <div>
                <div className="small-toolbar">
                    <span>Projects</span>
                    <Tooltip mouseEnterDelay={1} placement="bottom" title="create project">
                        <Button className="icon-btn project-add-btn" type="primary" icon="file-add" onClick={this.createProject} />
                    </Tooltip>
                </div>
                <PerfectScrollbar>
                    <Menu
                        className="project-list"
                        mode="inline"
                        inlineIndent={0}
                        selectedKeys={[this.props.activeProject]}
                        onSelect={this.onSelectChanged}
                    >
                        {
                            this.props.projects.map(t =>
                                (
                                    <Menu.Item key={t.id} data={t}>
                                        <ProjectItem
                                            ref={ele => this.projectRefs[t.id] = ele}
                                            project={t}
                                            isOwner={t.owner.id === this.props.user.id}
                                            disbandProject={() => this.props.disbandProject(t)}
                                            quitProject={() => this.props.quitProject(t)}
                                            onNameChanged={name => this.changeProjectName(name, t)}
                                            editGlobalFunc={id => this.setState({
                                                ...this.state,
                                                currentOperatedProject: id,
                                                globalFunc: this.getProjectGlobalFunc(id),
                                                isGlobalFuncDlgOpen: true
                                            })}
                                            viewProjectLibs={id => this.setState({ ...this.state, currentOperatedProject: id, isProjectFileDlgOpen: true, projectFileType: ProjectFileTypes.lib })}
                                            viewProjectDatas={id => this.setState({ ...this.state, currentOperatedProject: id, isProjectFileDlgOpen: true, projectFileType: ProjectFileTypes.data })}
                                        />
                                    </Menu.Item>
                                )
                            )
                        }
                    </Menu>
                </PerfectScrollbar>
                {this.globalFuncDialog}
                {this.ProjectLibDialog}
            </div>
        );
    }
}

export default ProjectList;