import React from 'react';
import { DtoStress } from '../../../../server/src/interfaces/dto_stress';
import { SelectParam } from 'antd/lib/menu';
import { DtoUser } from '../../../../server/src/interfaces/dto_user';
import { StringUtil } from '../../utils/string_util';
import { Tooltip, Button, Menu } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NotificationMode } from '../../common/notification_mode';
import { noEnvironment, newStressName } from '../../common/constants';
import * as _ from 'lodash';
import { DtoRecord } from '../../../../server/src/interfaces/dto_record';
import { DtoEnvironment } from '../../../../server/src/interfaces/dto_environment';
import { DtoCollection } from '../../../../server/src/interfaces/dto_collection';
import {Dropdown,Icon} from "antd"

interface SwaggerListProps {
    swagger:any;
    activeTag:any;
    selectTag(tagName:string);
}

interface SwaggerListState {

}

const createDefaultStress: (user: DtoUser) => DtoStress = (user: DtoUser) => {
    return {
        id: StringUtil.generateUID(),
        name: newStressName,
        ownerId: user.id,
        collectionId: '',
        environmentId: noEnvironment,
        concurrencyCount: 1,
        repeat: 1,
        qps: 0,
        timeout: 0,
        keepAlive: true,
        requests: [],
        notification: NotificationMode.none,
        emails: '',
        stressRecords: []
    };
};

class SwaggerPathList extends React.Component<SwaggerListProps, SwaggerListState> {

    constructor(props: SwaggerListProps) {
        super(props);
        this.state = {
            isCreateNew: true,
            isEditDlgOpen: false,
            isEditDlgRendered: false
        };
    }

    public shouldComponentUpdate(nextProps: SwaggerListProps, nextState: SwaggerListState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    private onSelectChanged = (param: SelectParam) => {
        this.props.selectTag(param.item.props.data.id);
    }


    public render() {
        const { activeTag,swagger } = this.props;
        return (
            <div className="collection-panel app-project ">
            <div className="collection-tree-container" style={{paddingLeft: 20,paddingTop: 10}}>
                <div><span className="project-author">h</span> <span className="project-title">接口列表</span></div>
                {
                    Object.keys(swagger.paths)
                    .map(path =>
                       Object.keys( swagger.paths[path] ).map(method=>
                           (<li className="path-li path-li-post" key={method+path}>
                                   <div className="path-head">
                                       <span className="path-method">{method}</span>
                                       <span className="path-name">{path}</span>
                                       <span className="path-description text-ellipsis">{swagger.paths[path][method].summary}</span>
                                       <span className="middle-right">
                                           {swagger.paths[path][method].tags==null?null:swagger.paths[path][method].tags.map((tag)=><span key={method+path+tag} className="h-tag">{tag}</span>)}
                                       </span>
                                   </div>
                               </li>
                           )
                       )
                    )
                }

            </div>
            </div>
        );
    }
}

export default SwaggerPathList;