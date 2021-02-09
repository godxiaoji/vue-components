import ButtonGroup from '../Button/ButtonGroup.vue'

ButtonGroup.install = function(app) {
  app.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
