// import React, { useContext } from 'react';

// const createContextHooks =
//   <
//     T extends React.Context<any>,
//     Context extends T extends React.Context<infer U> ? U : never,
//   >(
//     ctx: T,
//   ) =>
//   () => {
//     const context = useContext<Context | null>(ctx);

//     if (!context) {
//       throw new Error(
//         '[GlobalComponentContext] context not found. check portal exists.',
//       );
//     }

//     return context;
//   };

// export default createContextHooks;
