// components/ui/icon.tsx
import { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import styles from "./icon.module.scss"; // Import the SCSS module

// Props for the IconLoader
interface IconLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number;
}

// The fallback loader now uses our SCSS module for styling
const IconLoader = ({ size = 24, className, ...props }: IconLoaderProps) => (
  <div
    role="img"
    aria-label="loading icon"
    {...props}
    style={{
      width: size,
      height: size,
    }}
    // Combine the scoped SCSS class with any additional className from props
    className={`${styles.loader} ${className || ""}`}
  />
);

// The main Icon component interface
interface IconProps extends Omit<LucideProps, "name"> {
  name: keyof typeof dynamicIconImports;
}

/**
 * A dynamic, type-safe Icon component that loads lucide-react icons on demand.
 * This component is style-agnostic, but its loader fallback uses SCSS modules.
 */
const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  // Pass only safe props to the IconLoader fallback
  return (
    <Suspense
      fallback={<IconLoader size={props.size} className={props.className} />}
    >
      <div className={styles.iconWrapper}>
        <LucideIcon {...props} />
      </div>
    </Suspense>
  );
};

export { Icon };
