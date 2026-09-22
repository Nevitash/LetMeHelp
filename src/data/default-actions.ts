import { ResourceIds } from "../models/resource-ids";
import {
    Action,
    BonusAction,
    FreeAction,
    Range,
    Reaction,
    ResourceType,
    SpecialRanges,
    TARGET_TYPES,
    TargetingMode,
} from "../models/types";

const feet = (value: number): Range => ({ feet: value });
const special = (value: SpecialRanges): Range => ({ special: value });

const actionDefaults = {
  canBeUsedAlongside: [ResourceType.ACTION],
  rulesVersion: "2024" as const,
  targetingMode: TargetingMode.SPECIFIC,
};

const bonusActionDefaults = {
  canBeUsedAlongside: [ResourceType.BONUS_ACTION, ResourceType.ACTION],
  rulesVersion: "2024" as const,
  targetingMode: TargetingMode.SPECIFIC,
};

const reactionDefaults = {
  canBeUsedAlongside: [ResourceType.REACTION],
  rulesVersion: "2024" as const,
  targetingMode: TargetingMode.SPECIFIC,
};

const freeActionDefaults = {
  canBeUsedAlongside: [ResourceType.FREE_ACTION],
  rulesVersion: "2024" as const,
  targetingMode: TargetingMode.SPECIFIC,
};

export const attack: Action = {
  ...actionDefaults,
  id: "action-attack",
  templateId: ResourceIds.ATTACK,
  name: "Attack",
  resourceType: ResourceType.ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.ENEMY],
  requiresTarget: true,
  summary: "Make one or more attacks with a weapon or an Unarmed Strike.",
  description: "Drawing or sheathing a weapon can be part of the Attack action.",
};

export const dash: Action = {
  ...actionDefaults,
  id: "action-dash",
  templateId: ResourceIds.DASH,
  name: "Dash",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "Gain extra movement for the current turn.",
  description: "The extra movement equals your Speed after applying modifiers.",
};

export const disengage: Action = {
  ...actionDefaults,
  id: "action-disengage",
  templateId: ResourceIds.DISENGAGE,
  name: "Disengage",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "Your movement does not provoke Opportunity Attacks for the rest of the turn.",
};

export const dodge: Action = {
  ...actionDefaults,
  id: "action-dodge",
  templateId: ResourceIds.DODGE,
  name: "Dodge",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "Focus on avoiding attacks until the start of your next turn.",
};

export const help: Action = {
  ...actionDefaults,
  id: "action-help",
  templateId: ResourceIds.HELP,
  name: "Help",
  resourceType: ResourceType.ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.ALLY],
  requiresTarget: true,
  summary: "Give an ally Advantage on an ability check or attack roll, as applicable.",
};

export const hide: Action = {
  ...actionDefaults,
  id: "action-hide",
  templateId: ResourceIds.HIDE,
  name: "Hide",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "Attempt to hide by making a Dexterity (Stealth) check.",
};

export const influence: Action = {
  ...actionDefaults,
  id: "action-influence",
  templateId: ResourceIds.INFLUENCE,
  name: "Influence",
  resourceType: ResourceType.ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.CREATURE],
  requiresTarget: true,
  summary: "Try to influence a creature through social interaction.",
};

export const magic: Action = {
  ...actionDefaults,
  id: "action-magic",
  templateId: ResourceIds.MAGIC,
  name: "Magic",
  resourceType: ResourceType.ACTION,
  targets: [TARGET_TYPES.SELF, TARGET_TYPES.ALLY, TARGET_TYPES.ENEMY, TARGET_TYPES.OBJECT],
  summary: "Take an action granted by a spell or another magical feature.",
};

export const ready: Action = {
  ...actionDefaults,
  id: "action-ready",
  templateId: ResourceIds.READY,
  name: "Ready",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "Prepare an action to take later when a specified trigger occurs.",
  description: "Readying an action uses your Reaction when the trigger occurs.",
};

export const search: Action = {
  ...actionDefaults,
  id: "action-search",
  templateId: ResourceIds.SEARCH,
  name: "Search",
  resourceType: ResourceType.ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF, TARGET_TYPES.OBJECT],
  summary: "Make a check to find something by using your senses or memory.",
};

export const utilize: Action = {
  ...actionDefaults,
  id: "action-utilize",
  templateId: ResourceIds.UTILIZE,
  name: "Utilize",
  resourceType: ResourceType.ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.OBJECT],
  requiresTarget: true,
  summary: "Interact with an object or feature of the environment that requires an action.",
};

export const lightWeaponExtraAttack: BonusAction = {
  ...bonusActionDefaults,
  id: "bonus-action-light-weapon-extra-attack",
  templateId: ResourceIds.LIGHT_WEAPON_EXTRA_ATTACK,
  name: "Light Weapon Extra Attack",
  resourceType: ResourceType.BONUS_ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.ENEMY],
  requiresTarget: true,
  oncePerTurn: true,
  summary: "Make one extra attack with a different Light weapon.",
};

export const featureOrSpellBonusAction: BonusAction = {
  ...bonusActionDefaults,
  id: "bonus-action-feature-or-spell",
  templateId: ResourceIds.FEATURE_OR_SPELL_BONUS_ACTION,
  name: "Feature or Spell Bonus Action",
  resourceType: ResourceType.BONUS_ACTION,
  targets: [TARGET_TYPES.SELF, TARGET_TYPES.ALLY, TARGET_TYPES.ENEMY, TARGET_TYPES.OBJECT],
  summary: "Use a feature, item, or spell that specifies a Bonus Action.",
};

export const opportunityAttack: Reaction = {
  ...reactionDefaults,
  id: "reaction-opportunity-attack",
  templateId: ResourceIds.OPPORTUNITY_ATTACK,
  name: "Opportunity Attack",
  resourceType: ResourceType.REACTION,
  range: feet(5),
  targets: [TARGET_TYPES.ENEMY],
  requiresTarget: true,
  trigger: "A creature you can see leaves your reach.",
  summary: "Make one melee attack against the provoking creature.",
};

export const readiedAction: Reaction = {
  ...reactionDefaults,
  id: "reaction-readied-action",
  templateId: ResourceIds.READIED_ACTION,
  name: "Readied Action",
  resourceType: ResourceType.REACTION,
  targets: [TARGET_TYPES.SELF],
  trigger: "The trigger specified when you took the Ready action occurs.",
  summary: "Take the action or move you prepared.",
};

export const featureOrSpellReaction: Reaction = {
  ...reactionDefaults,
  id: "reaction-feature-or-spell",
  templateId: ResourceIds.FEATURE_OR_SPELL_REACTION,
  name: "Feature or Spell Reaction",
  resourceType: ResourceType.REACTION,
  targets: [TARGET_TYPES.SELF, TARGET_TYPES.ALLY, TARGET_TYPES.ENEMY, TARGET_TYPES.OBJECT],
  trigger: "The feature, item, or spell specifies its trigger.",
  summary: "Use a feature, item, or spell that specifies a Reaction.",
};

export const communicate: FreeAction = {
  ...freeActionDefaults,
  id: "free-action-communicate",
  templateId: ResourceIds.COMMUNICATE,
  name: "Communicate",
  resourceType: ResourceType.FREE_ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF, TARGET_TYPES.ALLY, TARGET_TYPES.ENEMY],
  summary: "Communicate through brief utterances and gestures while taking other actions.",
};

export const interactWithObject: FreeAction = {
  ...freeActionDefaults,
  id: "free-action-interact-with-object",
  templateId: ResourceIds.INTERACT_WITH_OBJECT,
  name: "Interact with an Object",
  resourceType: ResourceType.FREE_ACTION,
  range: feet(5),
  targets: [TARGET_TYPES.OBJECT],
  requiresTarget: true,
  summary: "Interact with one object or feature of the environment during your movement or action.",
};

export const dropItem: FreeAction = {
  ...freeActionDefaults,
  id: "free-action-drop-item",
  templateId: ResourceIds.DROP_ITEM,
  name: "Drop an Item",
  resourceType: ResourceType.FREE_ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.OBJECT],
  oncePerTurn: true,
  summary: "Release an item you are holding.",
};

export const endConcentration: FreeAction = {
  ...freeActionDefaults,
  id: "free-action-end-concentration",
  templateId: ResourceIds.END_CONCENTRATION,
  name: "End Concentration",
  resourceType: ResourceType.FREE_ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  summary: "End your Concentration on a spell or other effect.",
};

export const changeWeapon: FreeAction = {
  ...freeActionDefaults,
  id: "free-action-change-weapon",
  templateId: ResourceIds.CHANGE_WEAPON,
  name: "Change Weapon",
  resourceType: ResourceType.FREE_ACTION,
  range: special(SpecialRanges.SELF),
  targets: [TARGET_TYPES.SELF],
  oncePerTurn: true,
  canBeUsedAlongside: [ResourceType.FREE_ACTION, ResourceType.ACTION],
  summary: "Switch the weapon you are wielding.",
  description: "Drawing or sheathing a weapon can instead be part of the Attack action.",
};

export const defaultActions: Action[] = [attack, dash, disengage, dodge, help, hide, influence, magic, ready, search, utilize];
export const defaultBonusActions: BonusAction[] = [lightWeaponExtraAttack, featureOrSpellBonusAction];
export const defaultReactions: Reaction[] = [opportunityAttack, readiedAction, featureOrSpellReaction];
export const defaultFreeActions: FreeAction[] = [communicate, interactWithObject, dropItem, endConcentration, changeWeapon];

export const defaultActionResources = {
  actions: defaultActions,
  bonusActions: defaultBonusActions,
  reactions: defaultReactions,
  freeActions: defaultFreeActions,
};