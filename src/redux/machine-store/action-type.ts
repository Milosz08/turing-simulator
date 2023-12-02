/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { MachineModes } from '~/app-utils/machine-modes';

export type SwitchMachineStateActionType = { selectedState: MachineModes };
export type SetInitialTapeInputActionType = { content: string };
export type SetChangeInputStateActionType = { stateLabelValue: string };
export type InsertSourceCodeActionType = { sourceCode: string };
export type LoadExampleProgramActionType = { sourceCode: string };
