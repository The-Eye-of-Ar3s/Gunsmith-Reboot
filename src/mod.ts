import { DependencyContainer } from "tsyringe";

// SPT types
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

// The new trader config
import * as baseJson from "../db/base.json";
import * as presetsJson from "../db/presets.json";

class SampleTrader implements IPreAkiLoadMod, IPostDBLoadMod
{
    mod: string

    constructor()
    {
        this.mod = "Gunsmith-Reboot";
    }

    public preAkiLoad(container: DependencyContainer): void
    {
        this.registerProfileImage(container);
        
        this.setupTraderUpdateTime(container);
    }
    // DONE
    
    public postDBLoad(container: DependencyContainer): void
    {

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");

        // Keep a reference to the tables
        const tables = databaseServer.getTables();
        // Add the new trader to the trader lists in DatabaseServer
        tables.traders[baseJson._id] = {
            assort: this.createAssortTable(),
            base: jsonUtil.deserialize(jsonUtil.serialize(baseJson)) as ITraderBase,
            questassort: undefined
        };

        // For each language, add locale for the new trader
        const locales = Object.values(tables.locales.global) as Record<string, string>[];
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = baseJson.name;
            locale[`${baseJson._id} FirstName`] = baseJson.surname;
            locale[`${baseJson._id} Nickname`] = baseJson.nickname;
            locale[`${baseJson._id} Location`] = baseJson.location;
            locale[`${baseJson._id} Description`] = "This is the cat shop";
        }
    }

    private registerProfileImage(container: DependencyContainer): void
    {
        // Reference the mod "res" folder
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageFilepath = `./${preAkiModLoader.getModPath(this.mod)}res`;

        // Register route pointing to the profile picture
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(baseJson.avatar.replace(".png", ""), `${imageFilepath}/gunsmith.png`);
    }

    private setupTraderUpdateTime(container: DependencyContainer): void
    {
        // Add refresh time in seconds when Config server allows to set configs
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = { traderId: baseJson._id, seconds: 3600 }
        traderConfig.updateTime.push(traderRefreshConfig);
    }

    private createAssortTable(): ITraderAssort 
    {
        // Assort table
        const assortTable: ITraderAssort = {
            nextResupply: 0,
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }

        Object.values(presetsJson).forEach((preset, index) => {
            if (index != 16)
            {
                preset.items.forEach((item) => {
                    if (item._id === preset.root)
                    {
                        assortTable.items.push({
                            _id: item._id,
                            _tpl: item._tpl,
                            parentId: "hideout",
                            slotId: "hideout",
                            upd: {
                                UnlimitedCount: true,
                                StackObjectsCount: 999999
                            }
                        });
                    } else {
                        assortTable.items.push({
                            _id: item._id,
                            _tpl: item._tpl,
                            parentId: item.parentId,
                            slotId: item.slotId,
                            upd: {
                                StackObjectsCount: 1
                            }
                        });
                    }
                });
            }
            assortTable.barter_scheme[preset.root] = [
                [
                    {
                        count: preset.price,
                        _tpl: "5449016a4bdc2d6f028b456f"
                    }
                ]
            ];
            assortTable.loyal_level_items[preset.root] = 1;
        })

        return assortTable;
    }
}

module.exports = { mod: new SampleTrader() }