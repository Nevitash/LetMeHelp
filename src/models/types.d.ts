export declare interface User {
    id: uuid;
    name: string;
};

export declare const enum SpecialRanges {
    TOUCH = "touch",
    SIGHT = "sight",
    SELF = "self",
    UNLIMITED = "unlimited",
}

export declare const enum TARGET_TYPES {
    SELF = "self",
    ALLY = "ally",
    ENEMY = "enemy",
    CREATURE = "creature",
    CREATURES = "creatures",
    OBJECT = "object",
}

export declare const enum AreaShape {
    CONE = "cone",
    LINE = "line",
    SPHERE = "sphere",
    CUBE = "cube",
    CYLINDER = "cylinder",
    WALL = "wall",
}

export declare const enum TargetingMode {
    SPECIFIC = "specific",
    ALL_IN_AREA = "all-in-area",
}

export declare const enum ResourceType {
    ACTION = "action",
    BONUS_ACTION = "bonusaction",
    REACTION = "reaction",
    FREE_ACTION = "free action",
}

export declare interface ResourceIdMap {
    ATTACK: "attack";
    DASH: "dash";
    DISENGAGE: "disengage";
    DODGE: "dodge";
    HELP: "help";
    HIDE: "hide";
    INFLUENCE: "influence";
    MAGIC: "magic";
    READY: "ready";
    SEARCH: "search";
    UTILIZE: "utilize";
    LIGHT_WEAPON_EXTRA_ATTACK: "light-weapon-extra-attack";
    FEATURE_OR_SPELL_BONUS_ACTION: "feature-or-spell-bonus-action";
    OPPORTUNITY_ATTACK: "opportunity-attack";
    READIED_ACTION: "readied-action";
    FEATURE_OR_SPELL_REACTION: "feature-or-spell-reaction";
    COMMUNICATE: "communicate";
    INTERACT_WITH_OBJECT: "interact-with-object";
    DROP_ITEM: "drop-item";
    END_CONCENTRATION: "end-concentration";
    CHANGE_WEAPON: "change-weapon";
}

export declare type ResourceId = ResourceIdMap[keyof ResourceIdMap];

export declare interface Range {
    feet?: number;
    special?: SpecialRanges;
};

export declare interface ConeArea {
    shape: AreaShape.CONE;
    lengthFeet: number;
};

export declare interface LineArea {
    shape: AreaShape.LINE;
    lengthFeet: number;
    widthFeet: number;
};

export declare interface SphereArea {
    shape: AreaShape.SPHERE;
    radiusFeet: number;
};

export declare interface CubeArea {
    shape: AreaShape.CUBE;
    sizeFeet: number;
};

export declare interface CylinderArea {
    shape: AreaShape.CYLINDER;
    radiusFeet: number;
    heightFeet: number;
};

export declare interface WallArea {
    shape: AreaShape.WALL;
    lengthFeet: number;
    heightFeet: number;
    thicknessFeet: number;
};

export declare type AreaOfEffect =
    | ConeArea
    | LineArea
    | SphereArea
    | CubeArea
    | CylinderArea
    | WallArea;

export declare interface ResourceBase {
    id: string;
    templateId?: ResourceId;
    name: string;
    description?: string;
    summary?: string;
    rulesVersion: "2024";
    oncePerTurn?: boolean;
    canBeUsedAlongside: ResourceType[];
};

export declare interface Resource extends ResourceBase {
    resourceType: ResourceType;
    range?: Range;
    areas?: AreaOfEffect[];
    targets?: TARGET_TYPES[];
    targetingMode: TargetingMode;
    requiresTarget?: boolean;
};

export declare interface Action extends Resource {
    resourceType: ResourceType.ACTION;
};

export declare interface BonusAction extends Resource {
    resourceType: ResourceType.BONUS_ACTION;
};

export declare interface Reaction extends Resource {
    resourceType: ResourceType.REACTION;
    trigger: string;
};

export declare interface FreeAction extends Resource {
    resourceType: ResourceType.FREE_ACTION;
};

export const enum MovementType {
    CLIMB = "climb",
    RUN = "run",
    FLY = "fly",
    SWIM = "swim",
    TELEPORT = "teleport",
};

export declare interface Movement {
    id: string;
    name: string;
    type: MovementType;
    maxDistance: number;
    remainingDistance: number;
};

export declare interface AvailableActions {
    actions: Action[];
    bonusActions: BonusAction[];
    reactions: Reaction[];
    freeActions: FreeAction[];
}

export declare interface AvailableResources {
    maxActions: number;
    currentActions: number;
    maxBonusActions: number;
    currentBonusActions: number;
    maxReactions: number;
    currentReactions: number;
    freeActionUses: number | null;
    movements: Movement[];
};

export declare interface State {
    user: User | undefined;
    availableResources: AvailableResources;
    defaultResources: AvailableActions;
    additionalResources: AvailableActions;
};