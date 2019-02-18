import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('254365472131484')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('517458041318-t34hte5huhss34krkrb4amc0pf96vap5.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}
