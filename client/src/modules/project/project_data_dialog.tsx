import React from 'react';
import { Table, Upload, Button, message, Modal, Popconfirm } from 'antd';
import { ProjectData, ProjectFiles } from '../../../../server/src/interfaces/dto_project_data';
import * as _ from 'lodash';
import { ProjectFileType, ProjectFileTypes } from '../../common/custom_type';
import { Urls } from '../../utils/urls';

interface ProjectDataDialogProps {

    projectId: string;

    type: ProjectFileType;

    projectFiles: ProjectFiles;

    isDlgOpen: boolean;

    title: string;

    deleteFile(pid: string, name: string, type: ProjectFileType);

    addFile(pid: string, name: string, path: string, type: ProjectFileType);

    onClose();
}

interface ProjectDataDialogState { }

type ProjectDisplayData = ProjectData & { isGlobal: boolean };

class ProjectLibTable extends Table<ProjectDisplayData> { }

class ProjectLibColumn extends Table.Column<ProjectDisplayData> { }

class ProjectDataDialog extends React.Component<ProjectDataDialogProps, ProjectDataDialogState> {

    private constructProjectLibs = () => {
        const isLib = this.props.type === ProjectFileTypes.lib;
        const { globalJS, globalData, projectJS, projectData } = this.props.projectFiles;
        return _.orderBy(_.concat(_.values((isLib ? projectJS : projectData)[this.props.projectId] || {}).map(j => ({ ...j, isGlobal: false })), _.values(isLib ? globalJS : globalData).map(j => ({ ...j, isGlobal: true }))), ['createdDate'], ['desc']);
    }

    private delProjectLib = (plib: ProjectDisplayData) => {
        const { projectId, type, deleteFile } = this.props;
        deleteFile(projectId, plib.name, type);
    }

    private onUploadStatusChange = (info: any) => {
        if (info.file.status === 'done') {
            const { addFile, projectId, type } = this.props;
            addFile(projectId, this.adjustExt(info.file.name), `${projectId}/${info.file.name}`, type);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    private adjustExt = (file: string) => {
        if (this.props.type === ProjectFileTypes.lib) {
            const dotIndex = file.lastIndexOf('.');
            if (dotIndex > 0) {
                return file.substr(0, dotIndex);
            }
        }
        return file;
    }

    public render() {
        const projectLibs = this.constructProjectLibs();
        const { isDlgOpen, title, projectId, onClose, type } = this.props;
        const isLib = type === ProjectFileTypes.lib;
        const action = Urls.getUrl(`project/${projectId}/${type}`);
        return (
            <Modal
                visible={isDlgOpen}
                title={title}
                width={860}
                closable={true}
                onCancel={onClose}
                footer={[]}
            >
                <div style={{ height: 600 }}>
                    <div style={{ height: 30 }}>
                        <Upload accept={isLib ? '.zip' : ''} action={action} multiple={true} name="projectfile" showUploadList={false} withCredentials={true} onChange={this.onUploadStatusChange}>
                            <Button size="small" icon="upload" >
                                Upload new {isLib ? 'javascript lib (zip)' : 'data file'}
                            </Button>
                        </Upload>
                    </div>
                    <ProjectLibTable
                        className="project-table"
                        bordered={true}
                        size="middle"
                        rowKey="file"
                        dataSource={projectLibs}
                        pagination={false}
                    >
                        <ProjectLibColumn
                            title="Name"
                            dataIndex="name"
                        />
                        <ProjectLibColumn
                            title="Path"
                            dataIndex="path"
                            render={(text, record) => {
                                const globalPathIndex = (text || '').indexOf('global_data');
                                if (globalPathIndex < 0) {
                                    return (text || '').replace(/\\/g, '/');
                                } else {
                                    return (text || '').substr(globalPathIndex + 12).replace(/\\/g, '/');
                                }
                            }
                            }
                        />
                        {/* <ProjectLibColumn
                            title="Size"
                            dataIndex="size"
                            render={(text, record) => (record.size > 1024 * 1024 ? `${_.round(record.size / (1024 * 1024), 2)} MB` : (record.size > 1024 ? `${_.round(record.size / 1024, 2)} KB` : `${text} B`))}
                        /> */}
                        <ProjectLibColumn
                            title="CreatedDate"
                            dataIndex="createdDate"
                            render={(text, record) => new Date(record.createdDate).toLocaleDateString()}
                        />
                        <ProjectLibColumn
                            title="Action"
                            key="action"
                            width={140}
                            render={(text, record) => (
                                <span>
                                    <Popconfirm title="Sure to delete?" okText="Yes" cancelText="No" onConfirm={() => this.delProjectLib(record)}>
                                        <a>Delete</a>
                                    </Popconfirm>
                                </span>
                            )}
                        />
                    </ProjectLibTable>
                </div>
            </Modal>
        );
    }
}

export default ProjectDataDialog;