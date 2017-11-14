import React from 'react';
import { connect, Dispatch } from 'react-redux';
import StressList from './stress_list';
import { DtoStress } from '../../../../server/src/interfaces/dto_stress';
import { DtoUser } from '../../../../server/src/interfaces/dto_user';
import { State } from '../../state/index';
import * as _ from 'lodash';
import { DtoEnvironment } from '../../../../server/src/interfaces/dto_environment';
import { actionCreator } from '../../action/index';
import { Layout } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Splitter from '../../components/splitter';
import { UpdateLeftPanelType, ResizeLeftPanelType } from '../../action/ui';
import StressRunHistoryGrid from './stress_run_history_grid';
import { DtoRecord } from '../../../../server/src/interfaces/dto_record';
import { DtoCollection } from '../../../../server/src/interfaces/dto_collection';
import { StressRunResult } from '../../../../server/src/interfaces/dto_stress_setting';
import { SaveStressType, DeleteStressType, ActiveStressType, RunStressType } from '../../action/stress';
import StressWorkerStatus from './stress_worker_status';

const { Content, Sider } = Layout;

interface StressStateProps {

    collapsed: boolean;

    leftPanelWidth: number;

    user: DtoUser;

    activeStress: string;

    currentRunStressId: string;

    stresses: _.Dictionary<DtoStress>;

    collections: _.Dictionary<DtoCollection>;

    environments: _.Dictionary<DtoEnvironment[]>;

    records: _.Dictionary<DtoRecord>;

    runState?: StressRunResult;
}

interface StressDispatchProps {

    resizeLeftPanel(width: number);

    collapsedLeftPanel(collapsed: boolean);

    createStress(stress: DtoStress);

    selectStress(stressId: string);

    updateStress(stress: DtoStress);

    deleteStress(stressId: string);

    runStress(stressId: string);
}

type StressProps = StressStateProps & StressDispatchProps;

interface StressState { }

class StressTest extends React.Component<StressProps, StressState> {

    private get stressArr() {
        return _.chain(this.props.stresses).values<DtoStress>().sortBy('name').value();
    }
    public render() {
        const { collapsed, leftPanelWidth, collapsedLeftPanel, createStress, selectStress, updateStress, deleteStress, user, activeStress, currentRunStressId, collections, environments, records, stresses, runStress, runState } = this.props;
        const stress = stresses[activeStress] || {};

        return (
            <Layout className="main-panel">
                <Sider
                    className="main-sider"
                    style={{ minWidth: collapsed ? 0 : leftPanelWidth }}
                    collapsible={true}
                    collapsedWidth="0.1"
                    collapsed={collapsed}
                    onCollapse={collapsedLeftPanel}>
                    <StressList
                        stresses={this.stressArr}
                        user={user}
                        activeStress={activeStress}
                        currentRunStress={currentRunStressId}
                        collections={collections}
                        environments={environments}
                        createStress={createStress}
                        selectStress={selectStress}
                        updateStress={updateStress}
                        deleteStress={deleteStress}
                        runStress={runStress}
                        records={records}
                    />
                </Sider>
                <Splitter resizeCollectionPanel={this.props.resizeLeftPanel} />
                <Content>
                    <PerfectScrollbar>
                        <StressWorkerStatus />
                        <StressRunHistoryGrid
                            stressRecords={stress.stressRecords}
                            records={records}
                            runState={runState}
                            stress={stress}
                        />
                    </PerfectScrollbar>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state: State): StressStateProps => {
    const { leftPanelWidth, collapsed } = state.uiState.appUIState;
    const { stresses, activeStress, currentRunStressId, runState } = state.stressTestState;
    const records = _.chain(state.collectionState.collectionsInfo.records).values<_.Dictionary<DtoRecord>>().value();
    return {
        leftPanelWidth,
        collapsed,
        user: state.userState.userInfo,
        activeStress,
        currentRunStressId,
        collections: state.collectionState.collectionsInfo.collections,
        environments: state.environmentState.environments,
        stresses,
        records: records.length === 0 ? {} : records.reduce((p, c) => ({ ...p, ...c })),
        runState
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): StressDispatchProps => {
    return {
        createStress: (stress) => dispatch(actionCreator(SaveStressType, { isNew: true, stress })),
        updateStress: (stress) => dispatch(actionCreator(SaveStressType, { isNew: false, stress })),
        deleteStress: (stressId) => { dispatch(actionCreator(DeleteStressType, stressId)); },
        selectStress: (stressId) => dispatch(actionCreator(ActiveStressType, stressId)),
        collapsedLeftPanel: (collapsed) => dispatch(actionCreator(UpdateLeftPanelType, collapsed)),
        resizeLeftPanel: (width) => dispatch(actionCreator(ResizeLeftPanelType, width)),
        runStress: (stressId) => dispatch(actionCreator(RunStressType, stressId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StressTest);