import merge from "lodash/merge";

import { type Theme } from "@mui/material/styles";

import { accordion } from "./components/accordion";
import { alert } from "./components/alert";
import { appBar } from "./components/appbar";
import { autocomplete } from "./components/autocomplete";
import { avatar } from "./components/avatar";
import { backdrop } from "./components/backdrop";
import { badge } from "./components/badge";
import { breadcrumbs } from "./components/breadcrumbs";
import { button } from "./components/button";
import { buttonGroup } from "./components/button-group";
import { card } from "./components/card";
import { checkbox } from "./components/checkbox";
import { chip } from "./components/chip";
import { cssBaseline } from "./components/css-baseline";
import { dataGrid } from "./components/data-grid";
import { datePicker } from "./components/date-picker";
import { dialog } from "./components/dialog";
import { drawer } from "./components/drawer";
import { fab } from "./components/fab";
import { list } from "./components/list";
import { loadingButton } from "./components/loading-button";
import { menu } from "./components/menu";
import { pagination } from "./components/pagination";
import { paper } from "./components/paper";
import { popover } from "./components/popover";
import { progress } from "./components/progress";
import { radio } from "./components/radio";
import { rating } from "./components/rating";
import { select } from "./components/select";
import { skeleton } from "./components/skeleton";
import { slider } from "./components/slider";
import { stepper } from "./components/stepper";
import { svgIcon } from "./components/svg-icon";
import { switches } from "./components/switch";
import { table } from "./components/table";
import { tabs } from "./components/tabs";
import { textField } from "./components/textfield";
import { timeline } from "./components/timeline";
import { toggleButton } from "./components/toggle-button";
import { tooltip } from "./components/tooltip";
import { treeView } from "./components/tree-view";
import { typography } from "./components/typography";
import { defaultProps } from "./default-props";

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = merge(
    defaultProps(theme),
    //
    fab(theme),
    tabs(theme),
    chip(theme),
    card(theme),
    menu(theme),
    list(theme),
    badge(theme),
    table(theme),
    paper(theme),
    alert(theme),
    radio(theme),
    select(),
    button(theme),
    rating(theme),
    dialog(theme),
    appBar(),
    avatar(theme),
    slider(theme),
    drawer(theme),
    stepper(theme),
    tooltip(theme),
    popover(theme),
    svgIcon(),
    switches(theme),
    checkbox(theme),
    dataGrid(theme),
    skeleton(theme),
    timeline(theme),
    treeView(theme),
    backdrop(theme),
    progress(theme),
    textField(theme),
    accordion(theme),
    typography(theme),
    pagination(theme),
    datePicker(theme),
    buttonGroup(theme),
    breadcrumbs(theme),
    cssBaseline(),
    autocomplete(theme),
    toggleButton(theme),
    loadingButton(),
  );

  return components;
}
