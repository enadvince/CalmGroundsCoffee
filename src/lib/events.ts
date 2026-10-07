/** Tiny cross-component signal: a package card asks the booking form to preselect it. */
export const CHOOSE_PACKAGE_EVENT = "cg:choose-package";

export function choosePackage(id: string) {
  window.dispatchEvent(new CustomEvent<string>(CHOOSE_PACKAGE_EVENT, { detail: id }));
}
