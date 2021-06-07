declare module "*.modules.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.styl" {
  const classes: { [key: string]: string };
  export default classes;
}
