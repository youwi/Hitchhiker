import { DtoSchedule } from '../../../api/interfaces/dto_schedule';
import { RunResult } from '../../../api/interfaces/dto_run_result';
import * as _ from 'lodash';

export interface ScheduleState {

    schedules: _.Dictionary<DtoSchedule>;

    activeSchedule: string;

    runState: _.Dictionary<ScheduleRunState>;
}

export interface ScheduleRunState {

    isRunning: boolean;

    consoleRunResults: RunResult[];
}

export const scheduleDefaultValue: ScheduleState = {
    schedules: {},
    activeSchedule: '',
    runState: {}
};