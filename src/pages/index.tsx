import { Auth, Button, IconLogOut } from "@supabase/ui";
import type { ReactNode } from "react";
import React from "react";
import { LayoutWrapper } from "../components/layoutWrapper";
import { client } from "../libs/supabase";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();

  // ログインしている場合
  if (user) {
    return (
      <div>
        <div className="flex justify-end mx-2 my-4">
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => client.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }
  // ログインしていない場合
  return <>{props.children}</>;
};

const Home = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <div className="flex justify-center pt-8">
            <div className="w=full sm:w-96">
              <Auth
                supabaseClient={client}
                providers={["github"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default Home;