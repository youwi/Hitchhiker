import React from 'react';
import { connect, Dispatch } from 'react-redux';

import { Tabs, Badge, Modal, Button } from 'antd';
import * as _ from 'lodash';
import './style/index.less';
import { RecordState } from '../../../state/collection';
import { actionCreator } from '../../../action/index';
import { ActiveTabType, SaveRecordType, AddTabType, RemoveTabType } from '../../../action/record';
import { DtoRecord } from '../../../../../server/src/interfaces/dto_record';
import { State } from '../../../state/index';
import { ResizeResHeightType } from '../../../action/ui';
import { newRecordFlag } from '../../../common/constants';
import { ConflictType } from '../../../common/conflict_type';

interface ReqResPanelStateProps {


}

interface ReqResPanelDispatchProps {


}

type ReqResPanelProps = ReqResPanelStateProps & ReqResPanelDispatchProps;

interface ReqResPanelState {


}

class ReqSuiteView extends React.Component<ReqResPanelProps, ReqResPanelState> {

    private reqPanel: any;

    private reqResPanel: any;

    private reqHeight: number;

    constructor(props: ReqResPanelProps) {
        super(props);
        this.state = {

        };
    }
    public render() {


        return (
            <div className="request-tab" ref={ele => this.reqResPanel = ele}>
               all in doing
            </div>
        );
    }
}

const mapStateToProps = (state: State): ReqResPanelStateProps => {
    const { activeKey, recordStates } = state.displayRecordsState;
    const { selectedProject, collectionsInfo,selectedCollectionId } = state.collectionState;

    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): ReqResPanelDispatchProps => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReqSuiteView);