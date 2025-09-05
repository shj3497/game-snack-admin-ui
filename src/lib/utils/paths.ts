const paths = {
  auth: {
    sign_in: '/auth/sign-in',
    find_password: '/auth/find-password',
  },
  workspace: {
    main: '/workspace',
    event: (eventId: string) => ({
      catch_second: {
        main: `/workspace/event/${eventId}/catch-second`,
        statistic: `/workspace/event/${eventId}/catch-second/statistic`,
      },
      draw_second: {
        main: `/workspace/event/${eventId}/draw-second`,
        statistic: `/workspace/event/${eventId}/draw-second/statistic`,
      },
      find_second: {
        main: `/workspace/event/${eventId}/find-second`,
        statistic: `/workspace/event/${eventId}/find-second/statistic`,
      },
      roulette: {
        main: `/workspace/event/${eventId}/roulette`,
        statistic: `/workspace/event/${eventId}/roulette/statistic`,
      },
      rps_roulette: {
        main: `/workspace/event/${eventId}/rps-roulette`,
        statistic: `/workspace/event/${eventId}/rps-roulette/statistic`,
      },
    }),
    inquiry: {
      main: '/workspace/inquiry',
      list: '/workspace/inquiry',
      detail: (id: string | number) => `/workspace/inquiry/${id}`,
    },
    report: {
      main: '/workspace/report',
    },
    account: {
      main: '/workspace/account',
    },
    settings: {
      user: {
        main: '/workspace/settings/user',
        list: '/workspace/settings/user/list',
        create: '/workspace/settings/user/create',
        detail: (id: string | number) => `/workspace/settings/user/${id}`,
      },
      event: {
        main: '/workspace/settings/event',
        create: '/workspace/settings/event/create',
        detail: (id: string | number) => `/workspace/settings/event/${id}`,
      },
      ad: {
        main: '/workspace/settings/ad',
        create: '/workspace/settings/ad/create',
        detail: (id: string | number) => `/workspace/settings/ad/${id}`,
      },
      report_provider: {
        main: '/workspace/settings/report-provider',
        create: '/workspace/settings/report-provider/create',
        detail: (id: string | number) =>
          `/workspace/settings/report-provider/${id}`,
      },
    },
  },
  superspace: {
    main: '/superspace',
    settings: {
      app: {
        main: '/superspace/settings/app',
        create: '/superspace/settings/app/create',
        detail: (id: string | number) => `/superspace/settings/app/${id}`,
        edit: (id: string | number) => `/superspace/settings/app/${id}/edit`,
        report_provider: {
          create: (appId: string | number) =>
            `/superspace/settings/app/${appId}/report-provider/create`,
          detail: (appId: string | number, reportProviderId: string | number) =>
            `/superspace/settings/app/${appId}/report-provider/${reportProviderId}`,
        },
        user: {
          create: (appId: string | number) =>
            `/superspace/settings/app/${appId}/user/create`,
          detail: (appId: string | number, userId: string | number) =>
            `/superspace/settings/app/${appId}/user/${userId}`,
        },
      },
      user: {
        main: '/superspace/settings/user',
        create: '/superspace/settings/user/create',
      },
    },
  },
};

export default paths;
