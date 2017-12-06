import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Layout } from 'antd';
import Splitter from '../../components/splitter';
import CollectionList from './collection_tree';
import ReqResPanel from './req_res_panel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { actionCreator } from '../../action/index';
import { ResizeLeftPanelType, UpdateLeftPanelType } from '../../action/ui';
import ReqSuiteView from "./req_suite_view/req_suite_view"
const { Content, Sider } = Layout;

interface CollectionStateProps {

    collapsed: boolean;

    leftPanelWidth: number;

    activeModule: string;

    selectedCollectionId:string;
}

interface CollectionDispatchProps {

    resizeLeftPanel(width: number);

    updateLeftPanelStatus(collapsed: boolean, activeModule: string);
}

type CollectionProps = CollectionStateProps & CollectionDispatchProps;

interface CollectionState { }

class Collection extends React.Component<CollectionProps, CollectionState> {

    private onCollapse = (collapsed) => {
        this.props.updateLeftPanelStatus(collapsed, collapsed ? '' : this.props.activeModule);
    }

    public render() {
        const { collapsed, leftPanelWidth } = this.props;
        return (
            <Layout className="main-panel">
                <Sider
                    className="main-sider"
                    style={{ minWidth: collapsed ? 0 : leftPanelWidth }}
                    collapsible={true}
                    collapsedWidth="0.1"
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}>
                    <CollectionList />
                </Sider>
                <Splitter resizeCollectionPanel={this.props.resizeLeftPanel} />
                <Content style={{ marginTop: 4 }}>
                    <PerfectScrollbar>
                        {
                            this.props.selectedCollectionId!=""?<ReqSuiteView/>:<ReqResPanel />
                        }
                    </PerfectScrollbar>
                </Content>
            </Layout>
        );
    }
}
import { State } from '../../state';

const mapStateToProps = (state: State): CollectionStateProps => {
    const { leftPanelWidth, collapsed, activeModule } = state.uiState.appUIState;
    const { selectedCollectionId } = state.collectionState;

    return {
        leftPanelWidth,
        collapsed,
        activeModule,
        selectedCollectionId
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): CollectionDispatchProps => {
    return {
        resizeLeftPanel: (width) => dispatch(actionCreator(ResizeLeftPanelType, width)),
        updateLeftPanelStatus: (collapsed, activeModule) => dispatch(actionCreator(UpdateLeftPanelType, { collapsed, activeModule }))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Collection);

