interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    title: string;
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            title: 'Aliquet blandit commodo condimentum',
            description: 'Dictumst erat fringilla malesuada nulla primis sem semper taciti venenatis. Commodo elementum eros euismod felis iaculis luctus magna nisi odio quis sollicitudin ultricies vehicula.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            title: 'Dictumst erat fringilla malesuada',
            description: 'Aliquet blandit commodo condimentum convallis dictumst hendrerit inceptos laoreet neque pulvinar sagittis varius. Aptent augue bibendum diam dictumst dolor euismod felis habitasse himenaeos laoreet litora ridiculus rutrum.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            title: 'libero litora lobortis maecenas metus',
            description: 'Amet aptent cras cubilia diam dignissim egestas facilisis feugiat gravida iaculis ipsum libero litora lobortis maecenas metus mollis nostra per phasellus praesent sit sociis tempor velit vitae.',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}