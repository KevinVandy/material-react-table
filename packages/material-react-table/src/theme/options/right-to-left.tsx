import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useEffect } from "react";

// ----------------------------------------------------------------------

type Props = {
  themeDirection: "rtl" | "ltr";
  children: React.ReactNode;
};

export default function RTL({ children, themeDirection }: Props) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: "rtl",
    prepend: true,
    // @ts-ignore
    // https://github.com/styled-components/stylis-plugin-rtl/issues/35
  });

  if (themeDirection === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}
