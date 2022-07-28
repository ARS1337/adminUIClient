import {
  ADD_COSTOMIZER,
  ADD_LAYOUT,
  ADD_SIDEBAR_TYPES,
  ADD_SIDEBAR_SETTINGS,
  ADD_COLOR,
  ADD_MIX_BACKGROUND_LAYOUT,
  ROUTER_ANIMATION,
  SET_TOKEN,
  SET_USERNAME,
  SET_EMAIL
} from "../actionTypes";
import ConfigDB from "../../data/customizer/config";

const initial_state = {
  customizer: ConfigDB.data,
  configData: {},
  layout: "ltr",
  sidebar_types: {},
  settings: "",
  color: {},
  mix_background_layout: "",
  animation: "",
  token: "" || localStorage.getItem('token'),
  username: "",
  email:"" || localStorage.getItem('email')
};

const customizerReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      localStorage.setItem('email',action.payload.email)
      return {
        ...state,
        email:action.payload.email
      }
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case SET_TOKEN:
      localStorage.setItem('token',action.payload.token)
      return {
        ...state,
        token: action.payload.token,
      };

    case ADD_COSTOMIZER:
      return { ...state, loading: false, customizer: ConfigDB.data };

    case ADD_LAYOUT:
      state.customizer.settings.layout_type = action.payload;
      const layoutUpdate = state.customizer.settings.layout_type;
      return { ...state, loading: true, layout: layoutUpdate };

    case ADD_SIDEBAR_TYPES:
      state.customizer.settings.sidebar = action.payload;
      const sidebarTypeUpdate = state.customizer.settings.sidebar;
      return { ...state, loading: true, sidebar_types: sidebarTypeUpdate };

    case ADD_SIDEBAR_SETTINGS:
      state.customizer.settings.sidebar_setting = action.payload;
      const settingsUpdate = state.customizer.settings.sidebar_setting;
      return { ...state, loading: true, settings: settingsUpdate };

    case ADD_COLOR:
      const colors = action.payload;
      state.customizer.color.primary_color = colors.primary_color;
      state.customizer.color.secondary_color = colors.secondary_color;
      return { ...state, color: colors, loading: true };

    case ADD_MIX_BACKGROUND_LAYOUT:
      const mix_background_layout = action.payload;
      state.customizer.color.mix_background_layout = mix_background_layout;
      return {
        ...state,
        mix_background_layout: mix_background_layout,
        loading: true,
      };

    case ROUTER_ANIMATION:
      const anim = action.payload;
      state.customizer.router_animation = anim;
      return { ...state, animation: anim, loading: true };

    default:
      return { ...state };
  }
};
export default customizerReducer;
