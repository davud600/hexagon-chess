import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, type SyntheticEvent } from "react";
import style from "./Tutorial.module.scss";
import Image from "next/image";
interface TutorialProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TutorialTab = (props: TutorialProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="Tutorial Tab"
      hidden={value !== index}
      id={`tutorialTab-${index}`}
      aria-labelledby={`tutorialTab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Tutorial = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Board" className={style.tab} />
            <Tab label="Pawn" className={style.tab} />
            <Tab label="Knight" className={style.tab} />
            <Tab label="Bishop" className={style.tab} />
            <Tab label="Rook" className={style.tab} />
            <Tab label="Queen" className={style.tab} />
            <Tab label="King" className={style.tab} />
          </Tabs>
        </Box>
        <TutorialTab value={value} index={0}>
          <div className={style.wrapper}>
            <span className={style.title}>The legendary hexagonal board!</span>
            <section>
              <span className={style.description}>
                Okay the board might look weird.
                <br /> Because it is... <br />
                Although, it`s fun once you know how the pieces move!
              </span>
              <Image
                src="/HexagonalBoard.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={1}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The mighty <strong>pawn</strong>!
            </span>
            <section>
              <Image
                src="/hex_pawnMovement.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
              <span className={style.description}>
                <br /> It isn`t any different from regular chess. At the start
                of the game, the player can move one or two spaces. From then,
                only one up is allowed.
              </span>
            </section>
            <section>
              <span className={style.description}>
                The capturing is exactly the same... , except it`s not... <br />
              </span>
              <Image
                src="/hex_pawnBeforeCapture.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
            </section>
            <section>
              <Image
                src="/hex_pawnAfterCaptureLeft.jpg"
                height={500}
                width={500}
                alt="noBoard"
              />
              <span className={style.description}>
                Whether you take on the left or right, that will change the
                outcome of how close you are to sending the pawn to the `end` of
                the board. If you take on the left there`s 3 spaces left, if you
                take on the right there`s 4.
              </span>
              <Image
                src="/hex_pawnAfterCaptureRight.jpg"
                height={500}
                width={500}
                alt="noBoard"
              />
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={2}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The holy <strong>knight</strong>!
            </span>
            <section>
              <span className={style.description}>
                The moves are the same, two steps forward, one step over.
                Forward as in straight, don`t confuse it with diagonal.
              </span>
              <Image
                src="/hex_knightMovement.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
            </section>
            <section>
              <div className={style.flex}>
                <Image
                  src="/hex_knightBeforeCapture.jpg"
                  height={500}
                  width={500}
                  alt="noKnight"
                />
                <Image
                  src="/hex_knightAfterCapture.jpg"
                  height={500}
                  width={500}
                  alt="noKnight"
                />
              </div>
              <span className={style.description}>
                In normal chess the knight can move up to 8 spaces, here it can
                move up to 12!
              </span>
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={3}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The stealthy <strong>bishop</strong>!
            </span>
            <section>
              <Image
                src="/hex_bishopLegalMoves.jpg"
                height={500}
                width={500}
                alt="noBoard"
              />
              <span className={style.description}>
                <br /> It might be confusing to know which line is diagonal and
                which is straight. In the hexagonal board, if it helps you can
                think of diagonal the hexagon that doesn`t touch with the piece
                directly.
                <br />
                Although don`t confuse it with forward hexagons, the bishop
                can`t move there!
              </span>
              <Image
                src="/hex_bishopMovement.jpg"
                height={500}
                width={500}
                alt="noBoard"
              />
            </section>
            <section>
              <Image
                src="/hex_allBishops.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
              <span className={style.description}>
                As you might have seen in the first image, we have 3 bishops.{" "}
                <br />
                One bishop per each color.
              </span>
            </section>
            <section>
              <div className={style.col}>
                <span className={style.description}>
                  Look at the capturing below. Although this might seem like
                  it`s blocked, that`s a legal move.
                </span>
                <div className={style.flex}>
                  <Image
                    src="/hex_bishopBeforeCapture.jpg"
                    height={600}
                    width={600}
                    alt="noBoard"
                  />
                  <Image
                    src="/hex_bishopAfterCapture.jpg"
                    height={600}
                    width={600}
                    alt="noBoard"
                  />
                </div>
              </div>
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={4}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The deadly <strong>rook</strong>!
            </span>
            <section>
              <span className={style.description}>
                It is the most similar piece from the regular chess. <br />
                It can move in any file that it touches.
              </span>
              <Image
                src="/hex_rookMovement.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={5}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The <strong>QUEEN</strong>!
            </span>
            <section>
              <span className={style.description}>
                It is the most powerful piece in hexagonal chess! <br />
                But it`s kinda confusing...? <br />
                Well not really...
              </span>
              <Image
                src="/hex_queenMovement.jpg"
                height={600}
                width={600}
                alt="noQueen"
              />
            </section>
            <section>
              <div className={style.col}>
                <div className={style.flex}>
                  <Image
                    src="/hex_diagonalMoves.jpg"
                    height={450}
                    width={450}
                    alt="noMoves"
                  />
                  <Image
                    src="/hex_straightMoves.jpg"
                    height={450}
                    width={450}
                    alt="noMoves"
                  />
                </div>
                <Image
                  src="/hex_queenLegalMoves.jpg"
                  height={500}
                  width={500}
                  alt="noMoves"
                />
              </div>
              <span className={style.description}>
                Even in regular chess, you can think of the queen as the bishop
                and rook together, and that applies here too!
              </span>
            </section>
          </div>
        </TutorialTab>
        <TutorialTab value={value} index={6}>
          <div className={style.wrapper}>
            <span className={style.title}>
              The fragile <strong>king</strong>!
            </span>
            <section>
              <span className={style.description}>
                In regular chess, the king moves are the same as the queen`s,
                but for only one space over. <br />
                The same apply here too.
              </span>
              <Image
                src="/hex_kingMovement.jpg"
                height={600}
                width={600}
                alt="noBoard"
              />
            </section>
          </div>
        </TutorialTab>
      </Box>
    </div>
  );
};

export default Tutorial;
