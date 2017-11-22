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


interface ApiDocumentStateProps {
    collapsed: boolean;

    leftPanelWidth: number;

    user: DtoUser;
    projects: { id: string, name: string }[];


    activeStress: string;

    currentRunStressId: string;


    collections: _.Dictionary<DtoCollection>;

    environments: _.Dictionary<DtoEnvironment[]>;

    records: _.Dictionary<DtoRecord>;
    tmpSwagger:any;

}

interface ApiDocumentDispatchProps {
    resizeLeftPanel(width: number);
    selectProject(projectId: string);
    collapsedLeftPanel(collapsed: boolean);
    selectProjectTag(projectId:string,tagName:string)
}

type ApiDocumentProps = ApiDocumentStateProps & ApiDocumentDispatchProps;

interface ApiDocumentState { }

class ApiDocument extends React.Component<ApiDocumentProps, ApiDocumentState> {
    public render() {
        const { collapsed, leftPanelWidth, collapsedLeftPanel,user ,tmpSwagger} = this.props;

        return (
            <Layout className="main-panel">
                <Sider
                    className="main-sider"
                    style={{ minWidth: collapsed ? 0 : leftPanelWidth }}
                    collapsible={true}
                    collapsedWidth="0.2"
                    collapsed={collapsed}
                    onCollapse={collapsedLeftPanel}>
                    <SwaggerTagList swagger={tmpSwagger} activeTag={"OK"} selectTag={()=>{}}/>
                </Sider>
                <Splitter resizeCollectionPanel={this.props.resizeLeftPanel} />
                <Content>
                    <PerfectScrollbar>
                        <SwaggerPathList swagger={tmpSwagger} activeTag={"OK"} selectTag={()=>{}}/>
                    </PerfectScrollbar>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state: any): ApiDocumentStateProps => {
    const { leftPanelWidth, collapsed } = state.uiState.appUIState;
    return {
        ...state,
        leftPanelWidth,
        collapsed,
        tmpSwagger:require("./swagger-example.json")
     };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): ApiDocumentDispatchProps => {
    return {
        resizeLeftPanel: (width) => dispatch(actionCreator(ResizeLeftPanelType, width)),
        collapsedLeftPanel: (collapsed) => dispatch(actionCreator(UpdateLeftPanelType, collapsed)),
        selectProject: projectId => dispatch(actionCreator(SelectedProjectChangedType, projectId)),
        selectProjectTag: (projectId,tagName) => dispatch(actionCreator(SelectedProjectTagChangedType, {projectId,tagName})),


    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApiDocument);