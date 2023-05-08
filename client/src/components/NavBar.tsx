import {
   createStyles,
   Navbar,
   TextInput,
   // Code,
   UnstyledButton,
   Badge,
   Text,
   Group,
   ActionIcon,
   Tooltip,
   rem,
} from "@mantine/core";
import {
   IconBulb,
   // IconUser,
   // IconCheckbox,
   IconSearch,
   IconPlus,
   // IconSelector,
} from "@tabler/icons-react";
import styled from "styled-components";
import { useState } from "react";
import logo from "../../public/img/logo1.png";

const links = [
   { icon: IconBulb, label: "Home" },
   //    { icon: IconCheckbox, label: "Tasks", notifications: 4 },
   //    { icon: IconUser, label: "Contacts" },
];

const collections = [
   { emoji: "👍", label: "전체" },
   { emoji: "👍", label: "카페" },
   { emoji: "👍", label: "리필 스테이션" },
   { emoji: "👍", label: "식당" },
   { emoji: "👍", label: "식료품" },
   { emoji: "👍", label: "전기차" },
];

function NavbarSearch() {
   const { classes } = useStyles();
   const [search, setSearch] = useState("");

   const mainLinks = links.map((link) => (
      <UnstyledButton key={link.label} className={classes.mainLink}>
         <div className={classes.mainLinkInner}>
            <link.icon
               size={20}
               className={classes.mainLinkIcon}
               stroke={1.5}
            />
            <span>{link.label}</span>
         </div>
      </UnstyledButton>
   ));

   const collectionLinks = collections.map((collection) => (
      <a
         href="/"
         onClick={(event) => event.preventDefault()}
         key={collection.label}
         className={classes.collectionLink}
      >
         <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
            {collection.emoji}
         </span>{" "}
         {collection.label}
      </a>
   ));

   // 검색창 값 상태 저장하는 함수
   const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
   };

   // 버튼 클릭시 값을 콘솔에 저장하는 함수(ajax요청으로 활용)
   const searchClickHandler = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();

      console.log(search);
   };

   return (
      <Navbar
         // 네비게이션 높이 넓이 조절
         height={700}
         width={{ sm: 300 }}
         p="md"
         className={classes.navbar}
      >
         <Navbar.Section className={classes.section}>
            <ProfileDiv>
               <img src={logo} alt="로고이미지" style={{ width: "70px" }} />
               <div>이세영</div>
            </ProfileDiv>
         </Navbar.Section>

         <SearchForm>
            <label htmlFor="search-bar">
               <TextInput
                  id="search-bar"
                  type="text"
                  placeholder="Search"
                  size="xs"
                  icon={<IconSearch size="0.8rem" stroke={1.5} />}
                  mb="sm"
                  onChange={searchInputHandler}
               />
            </label>
            <button
               type="submit"
               className={classes.searchCode}
               onClick={searchClickHandler}
            >
               검색
            </button>
         </SearchForm>

         <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
         </Navbar.Section>

         <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
               <Text size="xs" weight={500} color="dimmed">
                  Community
               </Text>
               <Tooltip label="Create collection" withArrow position="right">
                  <ActionIcon variant="default" size={18}>
                     <IconPlus size="0.8rem" stroke={1.5} />
                  </ActionIcon>
               </Tooltip>
            </Group>
            <div className={classes.collections}>{collectionLinks}</div>
         </Navbar.Section>
      </Navbar>
   );
}

// 스타일드 컴포넌트
const ProfileDiv = styled.div`
   display: flex;
   justify-content: baseline;

   > div {
      display: flex;
      align-items: center;
   }
`;

const SearchForm = styled.form`
   position: relative;

   button {
      position: absolute;
      top: 0;
      margin-top: 2px;
      right: 2px;
      border-radius: 4px;

      cursor: pointer;
   }
`;

// mantine CSS
const useStyles = createStyles((theme) => ({
   navbar: {
      paddingTop: 0,
   },

   section: {
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      marginBottom: theme.spacing.md,

      "&:not(:last-of-type)": {
         borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark"
               ? theme.colors.dark[4]
               : theme.colors.gray[3]
         }`,
      },
   },

   searchCode: {
      width: 50,
      height: 25,
      fontWeight: 700,
      fontSize: rem(10),
      backgroundColor:
         theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      border: `${rem(1)} solid ${
         theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2]
      }`,

      // 버튼 호버
      "&:hover": {
         backgroundColor: "#faf1e6",
      },
   },

   mainLinks: {
      paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
      paddingBottom: theme.spacing.md,
   },

   mainLink: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontSize: theme.fontSizes.xs,
      padding: `${rem(8)} ${theme.spacing.xs}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[7],

      "&:hover": {
         backgroundColor:
            theme.colorScheme === "dark"
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
         color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
   },

   mainLinkInner: {
      display: "flex",
      alignItems: "center",
      flex: 1,
   },

   mainLinkIcon: {
      marginRight: theme.spacing.sm,
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
   },

   mainLinkBadge: {
      padding: 0,
      width: rem(20),
      height: rem(20),
      pointerEvents: "none",
   },

   collections: {
      paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
      paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
      paddingBottom: theme.spacing.md,
   },

   collectionsHeader: {
      paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
      paddingRight: theme.spacing.md,
      marginBottom: rem(5),
   },

   collectionLink: {
      display: "block",
      padding: `${rem(8)} ${theme.spacing.xs}`,
      textDecoration: "none",
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSizes.xs,
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
      lineHeight: 1,
      fontWeight: 500,

      "&:hover": {
         backgroundColor:
            theme.colorScheme === "dark"
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
         color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
   },
}));
export default NavbarSearch;
