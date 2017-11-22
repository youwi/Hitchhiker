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

interface ApiDocumentStateProps {
    collapsed: boolean;

    leftPanelWidth: number;

    user: DtoUser;

    activeStress: string;

    currentRunStressId: string;

    stresses: _.Dictionary<DtoStress>;

    collections: _.Dictionary<DtoCollection>;

    environments: _.Dictionary<DtoEnvironment[]>;

    records: _.Dictionary<DtoRecord>;

}

interface ApiDocumentDispatchProps {
    resizeLeftPanel(width: number);

    collapsedLeftPanel(collapsed: boolean);
}

type ApiDocumentProps = ApiDocumentStateProps & ApiDocumentDispatchProps;

interface ApiDocumentState { }

class ApiDocument extends React.Component<ApiDocumentProps, ApiDocumentState> {
    public render() {
        const { collapsed, leftPanelWidth, collapsedLeftPanel } = this.props;

        return (
            <Layout className="main-panel">
                <Sider
                    className="main-sider"
                    style={{ minWidth: collapsed ? 0 : leftPanelWidth }}
                    collapsible={true}
                    collapsedWidth="0.2"
                    collapsed={collapsed}
                    onCollapse={collapsedLeftPanel}>
                    正在开发中

                </Sider>
                <Splitter resizeCollectionPanel={this.props.resizeLeftPanel} />
                <Content>
                    <PerfectScrollbar>

                    </PerfectScrollbar>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state: any): ApiDocumentStateProps => {
    const { leftPanelWidth, collapsed } = state.uiState.appUIState;
    return {
        // ...mapStateToProps
        ...state,
        leftPanelWidth,
        collapsed,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): ApiDocumentDispatchProps => {
    return {
        resizeLeftPanel: (width) => dispatch(actionCreator(ResizeLeftPanelType, width)),
        collapsedLeftPanel: (collapsed) => dispatch(actionCreator(UpdateLeftPanelType, collapsed)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApiDocument);