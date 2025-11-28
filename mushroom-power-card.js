class MushroomDysonPowerCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) throw new Error("Specify entity");
    if (!config.power_sensor) throw new Error("Specify power_sensor");
    this._config = { icon: "mdi:fan", layout: "vertical", ...config };
  }

  set hass(hass) {
    if (!this._card) {
      this._card = document.createElement("mushroom-template-card");
      this.appendChild(this._card);
    }

    const entity = hass.states[this._config.entity];
    const power = hass.states[this._config.power_sensor]?.state ?? "0";

    this._card.setConfig({
      entity: this._config.entity,
      primary:
        this._config.name || entity?.attributes.friendly_name || "Device",
      icon: this._config.icon || "mdi:fan",
      icon_color: entity?.state === "on" ? "amber" : "grey",
      secondary: entity?.state === "on" ? `${power} W` : "",
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      layout: this._config.layout || "vertical",
    });

    this._card.hass = hass;
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("mushroom-dyson-power-card", MushroomDysonPowerCard);
