import dotenv from "dotenv";
dotenv.config();

const rawKey = process.env.PRIVATE_KEY;

console.log("--- Precise Key Inspection (v2) ---");

if (!rawKey) {
    console.log("❌ FAILED: PRIVATE_KEY is not defined at all.");
} else {
    console.log(`Key from .env is: "${rawKey}"`);

    // This is the important part. Let's find the '$'.
    const problemCharIndex = rawKey.indexOf('$');

    if (problemCharIndex !== -1) {
        console.log(`\n\n***************************************************`);
        console.log(`>>> ❌ FOUND IT! A '$' exists at index ${problemCharIndex}.`);
        console.log(`***************************************************\n`);
        console.log("This is the absolute cause of the error.");
        console.log("SOLUTION: Manually re-type the key in your .env file and restart your server.");

    } else {
        console.log("\n✅ SUCCESS: No '$' character was found in the string.");
    }
}

console.log("-----------------------------------");