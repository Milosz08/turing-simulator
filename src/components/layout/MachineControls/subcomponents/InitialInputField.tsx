/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux/reduxStore';
import { machineStateKeys } from '../../../../redux/machineStore/types';
import { MachineActions } from '../../../../redux/machineStore/actions';
import { MachineInitialTypes } from '../../../../redux/machineStore/initialState';

import { MachineControlsInput, MachineControlsInputContainer } from '../MachineControls.styles';

const InitialInputField: React.FC = (): JSX.Element => {

    const { tapeValues, disabledControls }: MachineInitialTypes = useSelector((state: RootState) => state.machineReducer);

    const { TAPE_VALUES, INITIAL_INPUT } = machineStateKeys;
    const { initialInput: disabledInput } = disabledControls;
    const { initialInput } = tapeValues;

    const dispatcher = useDispatch();

    const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        let addContent: string = target.value;
        if(target.value === '') {
            addContent = ' ';
        }
        dispatcher(MachineActions.changeSecondLevelSingleField(TAPE_VALUES, INITIAL_INPUT, addContent));
    };

    return (
        <MachineControlsInputContainer
            $content = 'initial input'
        >
            <MachineControlsInput
                type = 'text'
                value = {initialInput}
                onChange = {handleChangeInput}
                disabled = {disabledInput}
            />
        </MachineControlsInputContainer>
    );
};

export default InitialInputField;