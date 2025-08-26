// import s from "./balken.module.scss";
//
// const Balken = () => {
//   return (
//     <div className={s.balken}>
//       <div className={`${s.balken__part} ${s.first} brn`}>
//         <div className={s.balken__part__oben}>
//           <div className="container mx-w-1000"></div>
//         </div>
//         <div className={s.balken__part__unten}></div>
//       </div>
//       <div className={`${s.balken__part} ${s.second}`}>
//         <div className={s.balken__part__oben}></div>
//         <div className={s.balken__part__unten}></div>
//       </div>
//       <div className={`${s.balken__part} ${s.third}`}>
//         <div className={s.balken__part__oben}></div>
//         <div className={s.balken__part__unten}></div>
//       </div>
//       <div className={`${s.balken__part} ${s.middle}`}>
//         <div className={s.balken__part__oben}></div>
//         <div className={s.balken__part__unten}></div>
//       </div>
//       <div className={`${s.balken__part} ${s.last}`}>
//         <div className={s.balken__part__oben}></div>
//         <div className={s.balken__part__unten}></div>
//       </div>
//     </div>
//   );
// };
//
// export default Balken;

// /components/Header/Balken/Balken.jsx
import s from "./balken.module.scss";

// This configuration now perfectly describes the layout of each bar.
const balkenPartsConfig = [
  {
    id: "first",
    isSkewed: false,
    // The main bar takes up all available space. `flex: 1 1 auto` is more robust than `width: 100%`.
    style: { flex: "1 1 auto" },
  },
  {
    id: "second",
    isSkewed: true,
    // The negative margin is the key to the overlap in a flex layout.
    style: { width: "3.5rem", marginLeft: "-2.5rem" },
  },
  {
    id: "third",
    isSkewed: true,
    style: { width: "2.5rem" },
  },
  {
    id: "middle",
    isSkewed: true,
    style: { width: "2rem" },
  },
  {
    id: "last",
    isSkewed: true,
    style: { width: "1.5rem" },
  },
];

type Props = { children?: React.ReactNode };

/**
 * The definitive, data-driven Balken component that matches the original design.
 * @param {{ children: React.ReactNode }} props
 */
const Balken = ({ children }: Props) => {
  return (
    <div className={s.balken}>
      {balkenPartsConfig.map((part) => (
        <div
          key={part.id}
          // We conditionally apply the 'skewed' class
          className={`${s.balken__part} ${part.isSkewed ? s.skewed : ""}`}
          style={part.style}
        >
          <div className={s.balken__part__oben}>
            {part.id === "first" && (
              <div className="container mx-auto px-4">{children}</div>
            )}
          </div>
          <div className={s.balken__part__unten}></div>
        </div>
      ))}
    </div>
  );
};

export default Balken;
