import styles from "./styles.module.css";

const Template = ({ destructured, props }) => {
  const color = "238,0,0";

  return (
    <section className={styles.template__comp}>
      <button>Template</button>
      <p>
        This is a template structure that all jsx files should be based on.
        <br />
        Any file that returns html like syntax should be labeled jsx, placed
        into it&apos;s own folder and import a CSS module to provide local
        styling.
        <br />
        Stylesheets should provide all structural styling in rem units and use a
        wrapper class equal to the componentName__componentType. So, components
        should be wrapped with class layout__comp, pages with join__page, etc.
        Page CSS files will be included in the styles folder due to the specific
        folder structure required by NextJs. All other components will include a
        local CSS module in the same folder.
        <br />
        CSS modules are more performant than inline styles so the inline
        versions should only be used for user customizable{" "}
        <span style={{ color: `rgb(${color})` }}>theme</span> colors. This is a
        large scale project so we want to optimize public facing webpages as
        much as possible.
        <br />
        All {props} should be {destructured} when possible.
        <br />
        Use section tags when it makes sense for block level components.
        <br />
        Default max-width value for section &gt; containers will be 1600px +
        4rem with a 2rem margin on each side that starts when the viewport width
        reaches 1600px + 4rme;
      </p>
    </section>
  );
};

export default Template;
