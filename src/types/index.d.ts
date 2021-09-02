declare module "*.jpg";
declare module "*.jpeg";
declare module "*.scs";
declare module "*.ico";
declare module "*.png";
declare module "*.svg" {
  const content: string;
  export default content;
}
