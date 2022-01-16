import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src/dashboard/Table';

const meta: Meta = {
  title: 'Table',
  component: Table,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TableProps> = (args) => {
  const columns = [
    {
      id: 'name',
      Header: 'Name',
      width: '200',
      accessor: (row) => {
        return <div className="flex flex-col">{row?.details?.name}</div>;
      },
    },
    {
      id: 'followers',
      Header: 'Followers',
      accessor: (row) => {
        const numFollowers = row?.metrics?.followers?.length;

        return (
          <p style={{ width: '200px' }}>
            {numFollowers ? (
              numFollowers
            ) : (
              <span className="opacity-50">0</span>
            )}
          </p>
        );
      },
    },
    {
      id: 'totalCovers',
      Header: 'Total Covers',
      width: 80,
      accessor: (row) => (
        <p className="">
          {row?.bookings?.totalCovers > 0 ? (
            <>row?.bookings?.totalCovers</>
          ) : (
            <span className="opacity-50">0</span>
          )}
        </p>
      ),
    },
    {
      id: 'avgBooking',
      Header: 'Avg. Booking',
      width: 95,
      accessor: (row) => {
        return <p>£0.00</p>;
      },
    },
  ];

  const searchFunction = (query: string, data: any[]) => {
    // prettier-ignore
    const result = data.filter(restaurantData => {
      return (
        restaurantData.details?.name?.toLowerCase().includes(query.toLowerCase()) ||
        restaurantData.details?.id?.toLowerCase().includes(query.toLowerCase())
      );
    });

    return result;
  };

  return (
    <div className="absolute inset-0 p-10 bg-gray-100">
      <Table
        label="Restaurants"
        columns={columns}
        data={data}
        noDataLabel="No restaurants yet"
        searchFunction={searchFunction}
        paginateInterval={12}
        rowAccordianElement={({ id, row }) => (
          <>
            id: {id}, row: {String(row)}
          </>
        )}
        {...args}
      />
    </div>
  );
};

export const Default = Template.bind({});

const restaurant = {
  details: {
    video: 'https://youtu.be/77eyXN2WzWg',
    profilePicture: {
      description: '',
      imageUrl:
        'https://images.ctfassets.net/tq39z0nxr0bv/7aB5pxVh0RdDJ0eABOepG/5c2330a09f89dfd610884ad2cc892d6d/Restaurant_Logos_Back-a-yard.png',
      title: 'Restaurant Logos Back-a-yard',
      url:
        'https://images.ctfassets.net/tq39z0nxr0bv/7aB5pxVh0RdDJ0eABOepG/34b09c4da36361440203be35d6b57127/g2878.png',
    },
    name: 'Back-A-Yard Grill',
    cuisine: 'CARIBBEAN',
    tradingHoursText: {
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              value: 'Monday – Thursday: 11am – 2.30am',
              data: {},
              marks: [],
              nodeType: 'text',
            },
          ],
        },
        {
          data: {},
          content: [
            {
              value: 'Friday: 11am – 9am',
              data: {},
              nodeType: 'text',
              marks: [],
            },
          ],
          nodeType: 'paragraph',
        },
        {
          content: [
            {
              nodeType: 'text',
              marks: [],
              data: {},
              value: 'Saturday: 12pm – 9am',
            },
          ],
          nodeType: 'paragraph',
          data: {},
        },
        {
          content: [
            {
              data: {},
              marks: [],
              value: 'Sunday: Closed',
              nodeType: 'text',
            },
          ],
          nodeType: 'paragraph',
          data: {},
        },
      ],
      data: {},
      nodeType: 'document',
    },
    website: 'https://www.backayardgrill.co.uk/',
    publicPhoneNumber: '0207 101 3892',
    location: {
      address:
        'Halton Court, 1 Cranfield Walk Kidbrooke Village, London SE3 9EX, UK',
      lat: 51.46159,
      lon: 0.026407,
      displayLocation: 'Lewisham',
    },
    cuisines: [],
    city: 'london',
    description: {
      content: [
        {
          data: {},
          nodeType: 'paragraph',
          content: [
            {
              value:
                "There's nothing quite like authentic Caribbean food, it’s impossible to describe it in a sentence!",
              marks: [],
              nodeType: 'text',
              data: {},
            },
          ],
        },
        {
          content: [
            {
              marks: [],
              value:
                'When thinking of Caribbean food no doubt Jerk Chicken springs to mind. A fiery spice, Jerk is the signature flavour of Jamaica.',
              data: {},
              nodeType: 'text',
            },
          ],
          data: {},
          nodeType: 'paragraph',
        },
        {
          content: [
            {
              value:
                'We reached out to Restaurants all over London looking for the most authentic Jerk we could find.',
              nodeType: 'text',
              marks: [],
              data: {},
            },
          ],
          nodeType: 'paragraph',
          data: {},
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              data: {},
              value:
                "We found Back-A-Yard had the tastiest Jerk we've had in London. It is fragrant, fiery hot and smoky all at once. It sent us back to Jamaica, reminiscing a feeling of sitting on a beach enjoying a Jerk cooked with love by a Grandma from the local area.",
              marks: [],
            },
          ],
        },
        {
          data: {},
          content: [
            {
              nodeType: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              value: 'Why Back-A-Yard',
              data: {},
            },
          ],
          nodeType: 'paragraph',
        },
        {
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                "Back-a-Yard is as authentic you can get. It's a family run and owned business that uses its own recipes passed down generations. The fusion of spices, herbs and seasonings makes for mouth-watering food - you'll feel like you're in Jamaica. Best of all, the portion sizes are very generous, just like good authentic home cooking should be.",
              data: {},
              marks: [],
            },
          ],
          nodeType: 'paragraph',
        },
        {
          data: {},
          content: [
            {
              nodeType: 'text',
              marks: [],
              value: 'The dishes we really thought stood out are the ',
              data: {},
            },
            {
              marks: [
                {
                  type: 'bold',
                },
              ],
              nodeType: 'text',
              data: {},
              value: 'Jerk Chicken',
            },
            {
              nodeType: 'text',
              value: ' and ',
              marks: [],
              data: {},
            },
            {
              marks: [
                {
                  type: 'bold',
                },
              ],
              value: "Jamaican Spiced Mac 'n' Cheese",
              data: {},
              nodeType: 'text',
            },
            {
              marks: [],
              data: {},
              value: '.',
              nodeType: 'text',
            },
          ],
          nodeType: 'paragraph',
        },
        {
          content: [
            {
              nodeType: 'text',
              value: 'The ',
              data: {},
              marks: [],
            },
            {
              value: 'Jerk Chicken',
              marks: [
                {
                  type: 'bold',
                },
              ],
              data: {},
              nodeType: 'text',
            },
            {
              value:
                ' goes through a 48-hour process with 12 stages of seasoning. This is so the flavour gets right to the bone, making the chicken as tender as possible. They then slow cook it and sear it on a charcoal grill before being laid with their homemade Jerk sauce.',
              marks: [],
              nodeType: 'text',
              data: {},
            },
          ],
          data: {},
          nodeType: 'paragraph',
        },
        {
          content: [
            {
              value: 'This',
              marks: [],
              data: {},
              nodeType: 'text',
            },
            {
              marks: [
                {
                  type: 'bold',
                },
              ],
              data: {},
              value: " Mac 'n' Cheese",
              nodeType: 'text',
            },
            {
              value:
                " will be like no other version you've had. This style gives even more punch to the dish and adds a dimension you don't realise you'll love.",
              nodeType: 'text',
              data: {},
              marks: [],
            },
          ],
          nodeType: 'paragraph',
          data: {},
        },
      ],
      data: {},
      nodeType: 'document',
    },
    businessType: 'restaurant',
    heroIllustration: {
      url:
        'https://images.ctfassets.net/tq39z0nxr0bv/3STtAe65xsSCOcJxZeWph3/e3c29a37ca3260497ec6061940cbc99f/1Main_hero-02.svg',
      description: '',
      title: 'Main hero-02',
    },
    uriName: 'back-a-yard-grill',
    bookingSystemSite:
      'https://www.opentable.co.uk/r/back-a-yard-grill-at-the-village-restaurant-reservations-london?restref=205371&lang=en-GB&ot_source=Restaurant%20website',
    id: 'AX6PG0tqBsh9LXw6Ca28iJtHL9n2',
  },
  legal: {
    hasAcceptedTerms: true,
  },
  financial: {
    stripeConnectedAccount: {
      charges_enabled: true,
      type: 'custom',
      email: null,
      details_submitted: true,
      settings: {
        dashboard: {
          display_name: 'backayardgrill.co.uk',
          timezone: 'Etc/UTC',
        },
        card_issuing: {
          tos_acceptance: {
            ip: null,
            date: null,
          },
        },
        payouts: {
          debit_negative_balances: false,
          schedule: {
            interval: 'manual',
            delay_days: 7,
          },
          statement_descriptor: null,
        },
        branding: {
          icon: null,
          primary_color: null,
          secondary_color: null,
          logo: null,
        },
        payments: {
          statement_descriptor_kana: null,
          statement_descriptor: 'WWW.BACKAYARDGRILL.CO.UK',
          statement_descriptor_kanji: null,
        },
        card_payments: {
          decline_on: {
            avs_failure: false,
            cvc_failure: false,
          },
          statement_descriptor_prefix: null,
        },
        bacs_debit_payments: {},
        sepa_debit_payments: {},
      },
      business_type: 'company',
      metadata: {
        restaurantId: 'AX6PG0tqBsh9LXw6Ca28iJtHL9n2',
      },
      tos_acceptance: {
        user_agent:
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Safari/537.36',
        date: 1622588666,
        ip: '217.138.221.253',
      },
      created: 1622588663,
      payouts_enabled: true,
      id: 'acct_1IxgdHQfAJtf0M9Y',
      country: 'GB',
      business_profile: {
        mcc: '5812',
        support_email: null,
        support_phone: null,
        support_url: null,
        name: 'Back-a-Yard Grill',
        product_description: null,
        support_address: null,
        url: 'http://www.backayardgrill.co.uk',
      },
      object: 'account',
      external_accounts: {
        object: 'list',
        has_more: false,
        data: [
          {
            routing_number: '60-83-71',
            account_holder_type: null,
            bank_name: 'STARLING BANK LTD',
            currency: 'gbp',
            fingerprint: 'wpwqC3683eZtjciR',
            account_holder_name: null,
            available_payout_methods: ['standard'],
            last4: '4909',
            status: 'new',
            account: 'acct_1IxgdHQfAJtf0M9Y',
            id: 'ba_1IznHhQfAJtf0M9YgxlPVbyh',
            country: 'GB',
            object: 'bank_account',
            default_for_currency: true,
            metadata: {},
          },
        ],
        url: '/v1/accounts/acct_1IxgdHQfAJtf0M9Y/external_accounts',
        total_count: 1,
      },
      requirements: {
        errors: [],
        pending_verification: [],
        eventually_due: [],
        past_due: [],
        currently_due: [],
        current_deadline: null,
        disabled_reason: null,
      },
      company: {
        verification: {
          document: {
            details: null,
            details_code: null,
            front: 'file_1IznGUQfAJtf0M9Y2y5me9TE',
            back: null,
          },
        },
        owners_provided: false,
        directors_provided: true,
        executives_provided: true,
        tax_id_provided: true,
        address: {
          line2: '34 Tellson Avenue',
          country: 'GB',
          line1: '10 Aldwinckle House',
          state: null,
          postal_code: 'SE18 4ED',
          city: 'Woolwich, London',
        },
        phone: '+4402071013892',
        name: 'Back-a-Yard Grill Restaurant Café Ltd',
      },
      default_currency: 'gbp',
      capabilities: {
        transfers: 'active',
      },
    },
  },
};

const data = Array(20).fill(restaurant);
