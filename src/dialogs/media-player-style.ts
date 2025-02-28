const playerHeaderStyles = `
  .entity {
    color: rgb(var(--sq-primary-text-rgb)) !important;
    font-weight: var(--sq-primary-font-weight) !important;
    font-size: var(--sq-primary-font-size) !important;
  }
`;

const playerControlsStyles = `
  .icons {
    margin-bottom: 1rem;
    gap: 1rem;
  }
  mxmp-ha-player, ha-icon-button {
    --mdc-icon-size: 2rem !important;
    --mdc-icon-button-size: 3rem !important;
    border-radius: 50%;
    background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));
  }
  .big-icon {
    --mdc-icon-size: 3rem !important;
    --mdc-icon-button-size: 4rem !important;
    border-radius: 50%;
    background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));
  }
`;

const playerCardStyles = `
  ha-card {
    min-width: 40rem !important;
  }
`;

export const mediaPlayerCardMod = {
  style: {
    'ha-card': playerCardStyles,
    'mxmp-player$ mxmp-player-header$': playerHeaderStyles,
    'mxmp-player$ mxmp-player-controls$': playerControlsStyles,
  },
};
