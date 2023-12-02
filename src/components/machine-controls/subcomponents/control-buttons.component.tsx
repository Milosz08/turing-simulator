/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import * as React from 'react';
import type { JSX } from 'react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as MachineAction from '~/app-redux/machine-store/actions';
import { IMachineStoreReduxState } from '~/app-redux/machine-store/state';
import * as PrefAction from '~/app-redux/preferences-store/actions';
import { RootState } from '~/app-redux/redux-store';
import { HeadSpeed } from '~/app-utils/head-speed';
import { CompilerSyntaxIssues } from '~/app-utils/machine-messages';
import { MachineModes } from '~/app-utils/machine-modes';
import {
  MachineControlButton,
  MachineControlsButtonsContainer,
} from '../machine-controls.styles';
import ForwardBackwardButtonsComponent from './forward-backward-buttons.component';
import StartStopButtonsComponent from './start-stop-buttons.component';

const ControlButtonsComponent: React.FC = (): JSX.Element => {
  const stateMach: IMachineStoreReduxState = useSelector(
    (state: RootState) => state.machine
  );

  const { RUNNING, BACKWARD, FORWARD, STOPPED } = MachineModes;
  const { machineState: state, machineTuples, disabledControls } = stateMach;

  const errorsLength = machineTuples.errors.filter(
    (el: any) => el.danger !== CompilerSyntaxIssues.WARNING_LEVEL
  ).length;

  const fullSpeedDisabled =
    state === RUNNING ||
    state === STOPPED ||
    state === FORWARD ||
    state === BACKWARD;

  const dispatcher = useDispatch();

  const handleFullSpeed = (): void => {
    dispatcher(
      MachineAction.switchMachineStateAction({ selectedState: RUNNING })
    );
    dispatcher(
      PrefAction.switchHeadSpeedAction({
        selectedSpeed: Number(HeadSpeed.IMMEDIATELY),
      })
    );
  };

  const handleReset = (): void => {
    dispatcher(MachineAction.machineResetAction());
  };

  return (
    <MachineControlsButtonsContainer>
      <MachineControlButton
        onClick={handleFullSpeed}
        disabled={
          fullSpeedDisabled ||
          errorsLength > 0 ||
          disabledControls.controlButtons
        }>
        Run at full speed
      </MachineControlButton>
      <ForwardBackwardButtonsComponent
        render={() => <FaStepBackward />}
        dispatcherCallback={MachineAction.oneStepBackwardAction}
        machineMode={BACKWARD}
        disabledItem={
          state === RUNNING ||
          errorsLength > 0 ||
          disabledControls.controlButtons
        }
      />
      <StartStopButtonsComponent />
      <ForwardBackwardButtonsComponent
        render={() => <FaStepForward />}
        dispatcherCallback={MachineAction.oneStepForwardAction}
        machineMode={FORWARD}
        disabledItem={
          state === RUNNING ||
          errorsLength > 0 ||
          disabledControls.controlButtons
        }
      />
      <MachineControlButton
        onClick={handleReset}
        disabled={
          state === RUNNING || errorsLength > 0 || disabledControls.resetButton
        }>
        Machine Reset
      </MachineControlButton>
    </MachineControlsButtonsContainer>
  );
};

export default ControlButtonsComponent;
