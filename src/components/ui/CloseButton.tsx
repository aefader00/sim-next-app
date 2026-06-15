import clsx from "clsx";
import Block from "@/components/ui/Block";
import styles from "@/components/ui/CloseButton.module.css";

interface CloseButtonProps {
  href: string;
  className?: string;
}

export default function CloseButton({ href, className }: CloseButtonProps) {
  return (
    <Block
      as="a"
      href={href}
      pressable
      aria-label="Close"
      className={clsx(styles.root, className)}
    >
      <span className={styles.icon} aria-hidden="true" />
    </Block>
  );
}
