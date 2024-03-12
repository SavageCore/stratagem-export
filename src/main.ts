// @ts-ignore isolatedModules
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// Ensure the Stratagem names match.
// Sequence guide: Icon repo
const missMatchedNames = {
    'Auto-Cannon': 'Autocannon',
    'Ballistic Shield': 'Ballistic Shield Backpack',
    'Eagle Napalm Strike': 'Eagle Napalm Airstrike',
    'Orbital Railgun Strike': 'Orbital Railcannon Strike',
    'Reinforcement': 'Reinforce',
    'Shield Generator': 'Shield Generator Pack',
}

const exportSequences = async () => {
    const tables = document.querySelectorAll('.bb_table')
    const sequences = []

    window.scrollTo(0, 0)

    for (const table of tables) {
        table.scrollIntoView()

        const rows = table.querySelectorAll('.bb_table_tr')
        for (const row of rows) {
            const cells = row.querySelectorAll('.bb_table_td')
            if (cells.length === 0) {
                continue
            }
            let name = cells[1]?.textContent?.trim()

            if (name) {
                if ((missMatchedNames as { [key: string]: string })[name]) {
                    name = (missMatchedNames as { [key: string]: string })[name]
                }
            }

            const iconName = name?.toLowerCase().replace(/"/g, '').replace(/\s/g, '_') + '.svg'

            let sequence = ''

            const arrows = cells[2].querySelectorAll('img')
            for (const arrow of arrows) {
                if (arrow.src.includes('2BC55527EC20C05D73CBEC9F3EA3659C099D4AB8')) {
                    sequence += 'U'
                } else if (arrow.src.includes('A30A455C1EF5BF8740045A7604D79FFD2AC4E32C')) {
                    sequence += 'D'
                } else if (arrow.src.includes('31B94090BCCDC70ADACDEBED9E684B25EA9DCD9E')) {
                    sequence += 'L'
                } else if (arrow.src.includes('9BB08C279B93D1ECD6E7387386FFFC22B90A8BFC')) {
                    sequence += 'R'
                }
            }

            sequences.push({ name, sequence, image: iconName })
        }

        window.scrollTo(0, 0)
    }

    // Save the sequences as a JSON file
    const jsonContent = JSON.stringify(sequences, null, 2)
    const jsonBlob = new Blob([jsonContent], { type: 'application/json' })

    // Download the JSON file
    saveAs(jsonBlob, 'HD2-Sequences.json')
}

const exportIcons = async () => {
    const zip = new JSZip()
    const iconPromises = []

    const tables = document.querySelectorAll('article table')

    for (const table of tables) {
        table.scrollIntoView()

        const rows = table.querySelectorAll('tbody tr')
        for (const row of rows) {
            const cells = row.querySelectorAll('td')
            if (cells.length === 0) {
                continue
            }
            let name = cells[1]?.textContent?.trim()
            const imageElem = cells[0].querySelector('img')
            let iconName: string = ''

            if (imageElem) {
                iconName = name?.toLowerCase().replace(/"/g, '').replace(/\s/g, '_') + '.svg'

                const iconUrl = imageElem.src

                // Push the promise to the array
                iconPromises.push(new Promise<void>(async (resolve, reject) => {
                    try {
                        const response = await fetch(iconUrl);
                        const blob = await response.blob();
                        zip.file(iconName, blob, { base64: false, binary: true });
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                }));

            }
        }

        window.scrollTo(0, 0)
    }

    // Wait for all images to be loaded and added to the zip
    await Promise.all(iconPromises);

    // Download the zip file
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'hd2-icons.zip')
}

if (window.location.href.includes('sharedfiles/filedetails/?id=3161075951')) {
    exportSequences()
}

if (window.location.href.includes('nvigneux/Helldivers-2-Stratagems-icons-svg')) {
    exportIcons()
}