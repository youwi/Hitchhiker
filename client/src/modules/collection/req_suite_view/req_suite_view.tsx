import React from 'react';
import { connect, Dispatch } from 'react-redux';

import { Tabs, Badge, Modal, Button ,Card,Row,Col} from 'antd';
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
import { DtoCollection } from '../../../../../server/src/interfaces/dto_collection';

interface ReqResPanelStateProps {
    currentRecords:_.Dictionary<DtoRecord>;
    currentCollection:DtoCollection;
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
        let {currentRecords, currentCollection}=this.props
        if(currentRecords==null) currentRecords={}

        return (
            <div className="request-tab" ref={ele => this.reqResPanel = ele}>

                <Row gutter={16}>
                    <Col span={24}>
                        <Card title={currentCollection.name} bordered={true}>Card content</Card>
                    </Col>

                </Row>
                {
                    Object.keys(currentRecords).map((key,i)=><Row gutter={16} key={i}>
                        <Col span={24} >
                            <Card title={currentRecords[key].name} bordered={true}>{currentRecords[key].url}</Card>
                        </Col>
                    </Row>)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State): ReqResPanelStateProps => {
    const { activeKey, recordStates } = state.displayRecordsState;
    const { selectedProject, collectionsInfo,selectedCollectionId } = state.collectionState;
    const { records,collections} =collectionsInfo
    const currentRecords=records[selectedCollectionId]
    const currentCollection=collections[selectedCollectionId]

    return {
        currentRecords,
        currentCollection
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