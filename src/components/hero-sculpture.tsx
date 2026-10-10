"use client";

import { motion, type MotionValue } from "motion/react";

type SlabSpec = {
  size: number; // cqi
  x: number; // cqi offset from centre
  y: number;
  z: number; // cqi elevation of the slab's base
  layers: number;
  radius: string;
};

const LAYER_STEP = 0.55; // cqi between extrusion layers

const slabs: SlabSpec[] = [
  { size: 64, x: 0, y: 0, z: 0, layers: 10, radius: "32%" },
  { size: 42, x: 5, y: -4, z: 10 * LAYER_STEP, layers: 9, radius: "38%" },
  { size: 24, x: 9, y: -9, z: 19 * LAYER_STEP, layers: 8, radius: "44%" },
];

const topOf = (slab: SlabSpec) => slab.z + slab.layers * LAYER_STEP;
const cqi = (value: number) => `${value}cqi`;
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A terraced plinth with an orb, a leaf blade and a hovering ring, built
 * entirely from transformed divs. The camera angle comes from --rx / --rz
 * so children can counter-rotate to face the viewer.
 */
export function HeroSculpture({
  rotateX,
  rotateZ,
}: {
  rotateX: MotionValue<string>;
  rotateZ: MotionValue<string>;
}) {
  const top = slabs[2];
  const base = slabs[0];
  // Children that should face the camera undo the stage rotation.
  const faceCamera = "rotateZ(calc(var(--rz) * -1)) rotateX(calc(var(--rx) * -1))";

  return (
    <div className="sculpture relative aspect-square w-full [container-type:inline-size]">
      <motion.div
        className="sculpture-stage"
        style={
          {
            "--rx": rotateX,
            "--rz": rotateZ,
            transform: "scale(1.16) rotateX(var(--rx)) rotateZ(var(--rz))",
          } as React.CSSProperties & Record<string, unknown>
        }
      >
        {/* Ground shadow */}
        <div
          className="slab-shadow"
          style={{ left: "50%", top: "50%", width: cqi(70), height: cqi(70), margin: `${cqi(-35)} 0 0 ${cqi(-35)}` }}
        />

        {slabs.map((slab, index) => (
          <motion.div
            key={index}
            className="slab"
            style={{
              width: cqi(slab.size),
              height: cqi(slab.size),
              marginLeft: cqi(-slab.size / 2 + slab.x),
              marginTop: cqi(-slab.size / 2 + slab.y),
            }}
            initial={{ z: 220, scale: 0.86 }}
            animate={{ z: 0, scale: 1 }}
            transition={{ delay: 0.35 + index * 0.16, duration: 1.1, ease }}
          >
            {Array.from({ length: slab.layers }, (_, layer) => (
              <div
                key={layer}
                className="slab-layer"
                data-top={layer === slab.layers - 1 ? "" : undefined}
                style={
                  {
                    "--slab-radius": slab.radius,
                    transform: `translateZ(${cqi(slab.z + layer * LAYER_STEP)})`,
                  } as React.CSSProperties
                }
              />
            ))}
          </motion.div>
        ))}

        {/* Contact shadow for the orb on the top terrace */}
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: cqi(15),
            height: cqi(15),
            marginLeft: cqi(-7.5 + top.x),
            marginTop: cqi(-7.5 + top.y),
            transform: `translateZ(${cqi(topOf(top) + 0.05)})`,
            background: "radial-gradient(closest-side, var(--shadow-color), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Orb */}
        <motion.div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: cqi(top.x),
            marginTop: cqi(top.y),
          }}
          initial={{ z: 360 }}
          animate={{ z: 0 }}
          transition={{ delay: 0.95, type: "spring", stiffness: 120, damping: 14, mass: 1.1 }}
        >
          <div style={{ transform: `translateZ(${cqi(topOf(top) + 8.5)}) ${faceCamera}` }}>
            <div className="float-slow">
              <div className="orb" style={{ width: cqi(17), height: cqi(17), margin: `${cqi(-8.5)} 0 0 ${cqi(-8.5)}` }} />
            </div>
          </div>
        </motion.div>

        {/* Leaf blade standing on the base terrace */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "50%", marginLeft: cqi(-19), marginTop: cqi(15) }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.15, duration: 0.9, ease }}
        >
          <div
            style={{
              transform: `translateZ(${cqi(topOf(base))}) rotateZ(calc(var(--rz) * -1)) rotateX(-90deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <div
              className="blade"
              style={{
                width: cqi(13),
                height: cqi(24),
                marginLeft: cqi(-6.5),
                marginTop: cqi(-24),
                transform: "rotate(-8deg)",
                transformOrigin: "50% 100%",
              }}
            />
          </div>
        </motion.div>

        {/* Hovering ring */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "50%", marginLeft: cqi(-20), marginTop: cqi(-22) }}
          initial={{ z: 260 }}
          animate={{ z: 0 }}
          transition={{ delay: 1.3, duration: 1.2, ease }}
        >
          <div style={{ transform: `translateZ(${cqi(topOf(base) + 15)}) ${faceCamera}` }}>
            <div className="float-slower">
              <div
                className="ring"
                style={{
                  width: cqi(15),
                  height: cqi(15),
                  margin: `${cqi(-7.5)} 0 0 ${cqi(-7.5)}`,
                  borderWidth: cqi(2.1),
                  transform: "rotateX(62deg) rotateY(-18deg)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
