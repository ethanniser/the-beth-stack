export async function ErrorBoundary({
  fallback,
  children,
}: {
  fallback: JSX.Element;
  children: JSX.Element | JSX.Element[];
}): Promise<string> {
  if (!Array.isArray(children))
    throw new Error("children isnt array (shouldnt be possible)");

  return Promise.all(children)
    .then((children) => <>{children}</>)
    .catch(() => fallback);
}
