import logo from "../../assets/images/logo.svg";
// import githubLogo from "../../assets/images/github_logo.svg";
import gitlabLogo from "../../assets/images/gitlab_logo.svg";
import side from "../../assets/images/main_side.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Landing } from "../landing";

export function Login() {
  const navigation = useNavigate();

  // Mock 배포: OAuth 없이 버튼 클릭 시 곧장 /repos로 이동.
  const gitLabLogin = () => {
    navigation("/repos");
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div>
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen-banner">
        <div className="w-[75%] mx-auto flex items-center h-screen-banner justify-between snap-always snap-center scroll-smooth">
          <section>
            <div>
              <h1 className="text-5xl font-bold mb-[25px] ">
                GIT
                <img className="inline w-[45px]" src={logo} alt="logo" />
                EAT
              </h1>
              <article className="flex flex-col gap-[5px] text-[#5C5C5D] text-xl tracking-wide mb-[50px]">
                <span>
                  <strong>Git-Eat</strong>은 코드리뷰 문화를 처음 접하는 주니어
                  개발자들에게
                </span>
                <span>
                  온보딩 플랫폼을 제공하는 서비스입니다.{" "}
                  <strong>AI 코드리뷰</strong>를 통해
                </span>
                <span>효율적인 코드리뷰를 진행해보세요 ! Let’s Git-Eat!</span>
              </article>
              <div className="w-[370px] flex flex-col gap-[18px]">
                {/* <a
              href="/loading"
              className="h-[71px] flex gap-[9px] bg-black text-white items-center justify-center font-[20px] font-semibold rounded-[30px]"
            >
              <img className="w-[55px]" src={githubLogo} alt="github_logo" />
              GitHub로 시작하기
            </a> */}
                <button
                  onClick={gitLabLogin}
                  className="h-[71px] flex gap-[9px] bg-[#364CCA] text-white items-center justify-center font-[20px] font-semibold rounded-[30px]"
                >
                  <img src={gitlabLogo} alt="gitlab_logo" />
                  SSAFY Git으로 시작하기
                </button>
              </div>
            </div>
          </section>
          <img src={side} alt="side" />
        </div>
        <Landing />
      </div>
    </div>
  );
}
