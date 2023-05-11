import styled from "styled-components";

function PostContent() {
   return (
      <PostContentContainer>
         <p>
            지난 주에 경북대 근처에 있는 그린 그루브라는 카페를 갔었는데 좋아서
            추천드려요!!
         </p>
         <p>
            제로 웨이스트를 지향하는 카페라 친환경 원두랑 생분해 가능 용기를
            쓰신다 하더라구요! 가니까 친환경 샴푸바나 칫솔 이런 것도 팔아서
            구경하는 재미도 있었어요ㅋㅋ 아, 저는 갑자기 가서 못 들고 갔지만
            텀블러 가져가지면 할인도 된대요.
         </p>
         <p>경북대 근처에 사시는 분들은 한번 방문해보시면 좋을 거 같아요.</p>
      </PostContentContainer>
   );
}

export default PostContent;

export const PostContentContainer = styled.div`
   margin: 30px 0 30px 15px;
   font-size: 13px;
`;
