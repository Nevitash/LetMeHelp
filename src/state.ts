import { create } from "zustand";
import { defaultActionResources } from "./data/default-actions";
import { ResourceIds } from "./models/resource-ids";
import {
    Action,
    AvailableActions,
    AvailableResources,
    BonusAction,
    MovementType,
    Reaction,
    ResourceType,
    State,
    TARGET_TYPES,
    TargetingMode,
    User,
} from "./models/types";

export const defaultState: State = {
  user: undefined,
  availableResources: {
    maxActions: 1,
    currentActions: 1,
    maxBonusActions: 1,
    currentBonusActions: 1,
    maxReactions: 1,
    currentReactions: 1,
    freeActionUses: null,
    movements: [
      {
        id: "movement-run",
        name: "Run",
        type: MovementType.RUN,
        maxDistance: 30,
        remainingDistance: 30,
      }
    ],
  },
  defaultResources: defaultActionResources,
  additionalResources: {
    actions: [],
    bonusActions: [],
    reactions: [],
    freeActions: [],
  },
};

const addAction = (state: State): Pick<State, "additionalResources"> => ({
  additionalResources: {
    ...state.additionalResources,
    actions: [
      ...state.additionalResources.actions,
      {
        id: `custom-action-${state.additionalResources.actions.length + 1}`,
        templateId: ResourceIds.ATTACK,
        name: `Additional Action ${state.additionalResources.actions.length}`,
        resourceType: ResourceType.ACTION,
        range: { feet: 5 },
        targets: [TARGET_TYPES.ENEMY],
        targetingMode: TargetingMode.SPECIFIC,
        requiresTarget: true,
        canBeUsedAlongside: [ResourceType.ACTION],
        rulesVersion: "2024",
      } satisfies Action,
    ],
  },
});

const addBonusAction = (state: State): Pick<State, "additionalResources"> => ({
  additionalResources: {
    ...state.additionalResources,
    bonusActions: [
      ...state.additionalResources.bonusActions,
      {
        id: `custom-bonus-action-${state.additionalResources.bonusActions.length + 1}`,
        templateId: ResourceIds.FEATURE_OR_SPELL_BONUS_ACTION,
        name: `Additional Bonus Action ${state.additionalResources.bonusActions.length}`,
        resourceType: ResourceType.BONUS_ACTION,
        range: { feet: 5 },
        targets: [TARGET_TYPES.ENEMY],
        targetingMode: TargetingMode.SPECIFIC,
        requiresTarget: true,
        canBeUsedAlongside: [ResourceType.BONUS_ACTION, ResourceType.ACTION],
        rulesVersion: "2024",
      } satisfies BonusAction,
    ],
  },
});

const addReaction = (state: State): Pick<State, "additionalResources"> => ({
  additionalResources: {
    ...state.additionalResources,
    reactions: [
      ...state.additionalResources.reactions,
      {
        id: `custom-reaction-${state.additionalResources.reactions.length + 1}`,
        templateId: ResourceIds.FEATURE_OR_SPELL_REACTION,
        name: `Additional Reaction ${state.additionalResources.reactions.length}`,
        resourceType: ResourceType.REACTION,
        trigger: "Custom trigger",
        range: { feet: 5 },
        targets: [TARGET_TYPES.ENEMY],
        targetingMode: TargetingMode.SPECIFIC,
        requiresTarget: true,
        canBeUsedAlongside: [ResourceType.REACTION],
        rulesVersion: "2024",
      } satisfies Reaction,
    ],
  },
});

const addMovement = (state: State): Pick<State, "availableResources"> => ({
  availableResources: {
    ...state.availableResources,
    movements: [
      ...state.availableResources.movements,
      {
        id: `movement-${state.availableResources.movements.length + 1}`,
        name: "Additional Movement",
        type: MovementType.RUN,
        maxDistance: 30,
        remainingDistance: 30,
      },
    ],
  },
});

export const getAllResources = ({
  defaultResources,
  additionalResources,
}: Pick<State, "defaultResources" | "additionalResources">): AvailableActions => ({
  actions: [...defaultResources.actions, ...additionalResources.actions],
  bonusActions: [...defaultResources.bonusActions, ...additionalResources.bonusActions],
  reactions: [...defaultResources.reactions, ...additionalResources.reactions],
  freeActions: [...defaultResources.freeActions, ...additionalResources.freeActions],
});

export const appState = create((set) => ({
  ...defaultState,
  setUser: (user: User | undefined) => set({ user }),
  setAvailableResources: (availableResources: AvailableResources) => set({ availableResources }),
  addAction: () => set(addAction),
  addBonusAction: () => set(addBonusAction),
  addReaction: () => set(addReaction),
  addMovement: () => set(addMovement),
  setDefaultResources: (defaultResources: AvailableActions) => set({ defaultResources }),
  setAdditionalResources: (additionalResources: AvailableActions) => set({ additionalResources }),
  resetState: () => set({ ...defaultState }),
}));