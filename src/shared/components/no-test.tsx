const NoTest = function NoTest(props) {
  if (
    import.meta.env.NODE_ENV === "test" || !!import.meta.env.VITE_TEST_BUILD
  ) {
    return undefined;
  }

  return (
    <>
      {props.children}
    </>
  );
};

export { NoTest };
