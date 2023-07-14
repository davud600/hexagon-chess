/*

* {
    padding: 0;
    margin: 0;
}

$i:1;
$j:1;
$oddVel:55;
$evenVel:59;

* {
    padding: 0;
    margin: 0;
}

body {
    background: whitesmoke;
    overflow: hidden;
}

.manehex {
    position: absolute;
    top: -16px;
    left: -86px;

    .hexagon {
        width: 52px;
        height: 30px;
        background: #ccc;
        opacity: 0.4;
        position: absolute;
       transform: rotate(30deg);

        &::before,
        &::after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            background: #ccc;
        }

        &::before {
            transform: rotate(-60deg);
        }

        &::after {
            transform: rotate(60deg);
        }
    }

    div {
        &:hover::before,
        &:hover::after,
        &:hover {
            opacity: 1;
            background: whitesmoke;
            transition: cubic-bezier(0.23, 1, 0.320, 1);
            ;
        }
    }

    @for $i from 1 to 30 {
        @for $j from 1 to 30 {

            .linesecter:nth-child(#{$i}) {
                $i: $i - 1;

                .hex:nth-child(#{$j}) {

                    top: #{$i*54}px;

                    @if $i % 2==0 {
                        @if j==1 {
                            left: #{$j}px;
                        }

                        @else if j==2 {
                            $oddVel: 30;
                        }

                        @else if j==3 {
                            $oddVel: 85;
                        }

                        @else {
                            $oddVel: 59;
                            left: #{$j*$oddVel}px;
                        }

                    }

                    @else {

                        left: #{$j*$evenVel}px;
                    }
                }

                $i: $i+1;
            }
        }
    }
}
*/

type ModuleColor = "light" | "neutral" | "dark";

export function BoardModule({ color }: { color: ModuleColor }) {
  return <div className={`hexagon ${color}`}></div>;
}

export default function Board() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="manehex">
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
          <div className="hexagon hex"></div>
        </div>
      </div>
    </div>
  );
}
