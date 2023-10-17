interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Dictumst erat fringilla malesuada nulla primis sem semper taciti venenatis. Commodo elementum eros euismod felis iaculis luctus magna nisi odio quis sollicitudin ultricies vehicula.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In Progress: Aliquet blandit commodo condimentum convallis dictumst hendrerit inceptos laoreet neque pulvinar sagittis varius. Aptent augue bibendum diam dictumst dolor euismod felis habitasse himenaeos laoreet litora ridiculus rutrum.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finished: Amet aptent cras cubilia diam dignissim egestas facilisis feugiat gravida iaculis ipsum libero litora lobortis maecenas metus mollis nostra per phasellus praesent sit sociis tempor velit vitae.',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}