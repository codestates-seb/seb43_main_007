import profileImg1 from "../../assets/img/profile1.png";
import profileImg2 from "../../assets/img/profile2.png";
import profileImg3 from "../../assets/img/profile3.png";
import icon4 from "../../assets/img/icon4.png";
import icon5 from "../../assets/img/icon5.png";
import icon6 from "../../assets/img/icon6.png";

export interface MemberInfoType {
   name: string;
   img: string;
   githubUrl: string;
}

export const feMember: MemberInfoType[] = [
   {
      name: "주효진(팀장)",
      img: profileImg1,
      githubUrl: "https://github.com/HJNJu",
   },
   {
      name: "이세영",
      img: profileImg2,
      githubUrl: "https://github.com/LEE2302",
   },
   {
      name: "김수현",
      img: profileImg3,
      githubUrl: "https://github.com/kimsh322",
   },
];

export const beMember: MemberInfoType[] = [
   {
      name: "천찬웅(팀장)",
      img: icon4,
      githubUrl: "https://github.com/ccw7016",
   },
   {
      name: "이인건",
      img: icon5,
      githubUrl: "https://github.com/ingeon2",
   },
   {
      name: "김윤지",
      img: icon6,
      githubUrl: "https://github.com/jungdi3333",
   },
];
