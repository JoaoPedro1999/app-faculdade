import { NavigationActions } from "react-navigation";

let nav;

function setTopLevelNavigatior(navigatorRef) {
  nav = navigatorRef;
}

function navigate(routeName, params) {
  nav.dispatch(NavigationActions.navigate({ routeName, params }));
}

export default {
  setTopLevelNavigatior,
  navigate
};
