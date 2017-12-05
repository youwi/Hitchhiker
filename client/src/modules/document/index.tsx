import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import Splitter from '../../components/splitter';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {DtoUser} from "../../../../server/src/interfaces/dto_user";
import {DtoStress} from "../../../../server/src/interfaces/dto_stress";
import {DtoCollection} from "../../../../server/src/interfaces/dto_collection";
import {DtoEnvironment} from "../../../../server/src/interfaces/dto_environment";
import {DtoRecord} from "../../../../server/src/interfaces/dto_record";
import {actionCreator} from "../../action/index";
import {ResizeLeftPanelType, UpdateLeftPanelType} from "../../action/ui";
import SwaggerTagList from "./swagger_tag_list";
import {SelectedProjectChangedType,SelectedProjectTagChangedType} from "../../action/collection";
import './swagger_style.less';
import SwaggerPathList from "./swagger_path_list";
import {InitUpdateSwagger, SelectedProjectChangedSwaggerType, SwaggerChangerProgressType, SwaggerGetAllPathRecordsType, SwaggerGetAllPathTagType, swaggerGetProjectAllPathTag} from "../../action/swagger";
import {DtoProject} from "../../../../server/src/interfaces/dto_project";
import * as _ from 'lodash';


interface ApiDocumentStateProps {
    collapsed: boolean;

    leftPanelWidth: number;

    user: DtoUser;
    projects: { id: string, name: string ,swaggerUrl:string }[];
    selectedProject:string;
    activeStress: string;
    currentPathTagsPK:any;
    currentPathTags:any;
    currentRunStressId: string;
    currentPathRecords:any;


    collections: _.Dictionary<DtoCollection>;

    environments: _.Dictionary<DtoEnvironment[]>;

    records: _.Dictionary<DtoRecord>;
    tmpSwagger:any;

}

interface ApiDocumentDispatchProps {
    resizeLeftPanel(width: number);
    selectProject(projectId: string);
    collapsedLeftPanel(collapsed: boolean);
    selectProjectTag(projectId:string,tagName:string);
    refreshSwagger(url);
    changeProgress(projectId,methodPath,targetId);
    getPathTagProgress(projectId:string);
    getPathRecords(projectId:string,path:string)
}

type ApiDocumentProps = ApiDocumentStateProps & ApiDocumentDispatchProps;

interface ApiDocumentState {
    activeTag:string;
}

class ApiDocument extends React.Component<ApiDocumentProps, ApiDocumentState> {
    constructor(props){
        super(props)
        this.state={
            activeTag:""
        }
    }

    public componentDidMount() {
        /**
         * if empty ==>init it
         */
       if(!this.isNull(this.props.selectedProject) && this.isNull(this.props.tmpSwagger.paths) ){
           this.props.selectProject(this.props.selectedProject)
       }
        if(!this.isNull(this.props.currentPathTagsPK)  ){
            this.props.getPathTagProgress(this.props.selectedProject)
        }
    }
    isNull=(str)=> {
        if (str == null) return true
        if (str == "") return true
        if (str.constructor==Object){
           return Object.keys(str).length==0
        }
        if (str.constructor==Array ){
            if(str.length==0) return true
        }
        return false
    }



    refreshSwagger=()=>{
      //  this.props.refreshSwagger(project.swaggerUrl)
        this.props.refreshSwagger(this.findProjectById().swaggerUrl)
    }
    selectProject=(id)=>{
        this.props.projects!=null?this.props.projects.map((p)=>{
            if(p.id==id){
                this.props.selectProject(id)
            }
        }):null;

    }
    findProjectById=(id=this.props.selectedProject)=>{
        for(let project of this.props.projects){
            if(project.id==id)
                return project
        }
        return { id: "", name: "",swaggerUrl:"" }
       // this.props.projects[this.props.selectedProject]
    }
    changeProgress=(methodPath,targetId)=>{
        this.props.changeProgress(this.props.selectedProject,methodPath,targetId)
    }
    public render() {
        const { collapsed, leftPanelWidth, collapsedLeftPanel,user ,tmpSwagger,currentPathTagsPK,currentPathTags} = this.props;


        return (
            <Layout className="main-panel">
                <Sider
                    className="main-sider"
                    style={{ minWidth: collapsed ? 0 : leftPanelWidth }}
                    collapsible={true}
                    collapsedWidth="0.2"
                    collapsed={collapsed}
                    onCollapse={collapsedLeftPanel}>
                    <SwaggerTagList swagger={tmpSwagger}
                                    activeTag={this.state.activeTag||""}
                                    project={this.findProjectById()}
                                    projects={this.props.projects}
                                    selectProject={this.selectProject}
                                    refreshSwagger={this.refreshSwagger}
                                    selectTag={(activeTag)=>{this.setState({activeTag})}}/>
                </Sider>
                <Splitter resizeCollectionPanel={this.props.resizeLeftPanel} />
                <Content>
                    <PerfectScrollbar>
                        <SwaggerPathList swagger={tmpSwagger}
                                         pathTagsPK={currentPathTagsPK}
                                         pathTags={currentPathTags}
                                         activeTag={this.state.activeTag||""}
                                         pathRecords={this.props.currentPathRecords}
                                         getPathRecords={(path)=>{this.props.getPathRecords(this.props.selectedProject,path)}}
                                         selectTag={(activeTag)=>{this.setState({activeTag})}}
                                         changeProgress={this.changeProgress}
                        />
                    </PerfectScrollbar>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state: any): ApiDocumentStateProps => {
    const { leftPanelWidth, collapsed } = state.uiState.appUIState;
    const {projects,currentSwagger,currentPathTagsPK,currentPathTags,currentPathRecords}=state.projectState;
    const {selectedProject } = state.collectionState;
    let arr;
    if(projects.constructor==Object){
        arr= _.chain(projects)
            .values<DtoProject>()
            .sortBy('name')
            .value()
            .map(t => ({ id: t.id ? t.id : '', name: t.name ? t.name : '' ,swaggerUrl:t.swaggerUrl||""}));
    }
    return {
        ...state,
        selectedProject,
        leftPanelWidth,
        projects:arr,
        collapsed,
        currentPathRecords,
        currentPathTags,
        currentPathTagsPK, // require("./..json")
        tmpSwagger:currentSwagger  //||require("./swagger-example.json")
     };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): ApiDocumentDispatchProps => {
    return {
        resizeLeftPanel: (width) => dispatch(actionCreator(ResizeLeftPanelType, width)),
        collapsedLeftPanel: (collapsed) => dispatch(actionCreator(UpdateLeftPanelType, collapsed)),
        selectProject: projectId => {
            dispatch(actionCreator(SelectedProjectChangedSwaggerType, projectId))
            dispatch(actionCreator(SelectedProjectChangedType, projectId))
            dispatch(actionCreator(SwaggerGetAllPathTagType, projectId))
        },
        changeProgress:(projectId,methodPath,targetId)=>{
            console.log(projectId,methodPath,targetId)
            dispatch(actionCreator(SwaggerChangerProgressType, {projectId,methodPath,targetId}))
        },
        getPathTagProgress:(projectId)=>{
            dispatch(actionCreator(SwaggerGetAllPathTagType, projectId))
        },
        getPathRecords:(projectId:string,path:string)=>{
            dispatch(actionCreator(SwaggerGetAllPathRecordsType, {projectId,path}))
        },
        selectProjectTag: (projectId,tagName) => dispatch(actionCreator(SelectedProjectTagChangedType, {projectId,tagName})),
        refreshSwagger:(url )=>dispatch(actionCreator(InitUpdateSwagger,{url}))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApiDocument);