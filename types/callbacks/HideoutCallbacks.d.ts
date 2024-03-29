import { HideoutController } from "../controllers/HideoutController";
import { OnUpdate } from "../di/OnUpdate";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IHandleQTEEventRequestData } from "../models/eft/hideout/IHandleQTEEventRequestData";
import { IHideoutContinousProductionStartRequestData } from "../models/eft/hideout/IHideoutContinousProductionStartRequestData";
import { IHideoutImproveAreaRequestData } from "../models/eft/hideout/IHideoutImproveAreaRequestData";
import { IHideoutPutItemInRequestData } from "../models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "../models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "../models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "../models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "../models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "../models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeCompleteRequestData } from "../models/eft/hideout/IHideoutUpgradeCompleteRequestData";
import { IHideoutUpgradeRequestData } from "../models/eft/hideout/IHideoutUpgradeRequestData";
import { IRecordShootingRangePoints } from "../models/eft/hideout/IRecordShootingRangePoints";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IHideoutConfig } from "../models/spt/config/IHideoutConfig";
import { ConfigServer } from "../servers/ConfigServer";
export declare class HideoutCallbacks extends OnUpdate {
    protected hideoutController: HideoutController;
    protected configServer: ConfigServer;
    protected hideoutConfig: IHideoutConfig;
    constructor(hideoutController: HideoutController, // TODO: delay needed
    configServer: ConfigServer);
    /**
     * Handle HideoutUpgrade
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    upgrade(pmcData: IPmcData, body: IHideoutUpgradeRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutUpgradeComplete
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    upgradeComplete(pmcData: IPmcData, body: IHideoutUpgradeCompleteRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutPutItemsInAreaSlots
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    putItemsInAreaSlots(pmcData: IPmcData, body: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeItemsFromAreaSlots
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    takeItemsFromAreaSlots(pmcData: IPmcData, body: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutToggleArea
     */
    toggleArea(pmcData: IPmcData, body: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutSingleProductionStart
     */
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutScavCaseProductionStart
     */
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutContinuousProductionStart
     */
    continuousProductionStart(pmcData: IPmcData, body: IHideoutContinousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeProduction
     */
    takeProduction(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutQuickTimeEvent
     */
    handleQTEEvent(pmcData: IPmcData, request: IHandleQTEEventRequestData, sessionId: string): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - RecordShootingRangePoints
     */
    recordShootingRangePoints(pmcData: IPmcData, request: IRecordShootingRangePoints, sessionId: string): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - RecordShootingRangePoints
     */
    improveArea(pmcData: IPmcData, request: IHideoutImproveAreaRequestData, sessionId: string): IItemEventRouterResponse;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
