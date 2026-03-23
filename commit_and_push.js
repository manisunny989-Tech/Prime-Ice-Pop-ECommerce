const { execSync } = require('child_process');
const fs = require('fs');

const out = {};
const runSafe = (cmd, key) => {
    try {
        out[key] = execSync(cmd, { stdio: 'pipe' }).toString();
    } catch (e) {
        out[`${key}_err`] = e.stderr ? e.stderr.toString() : e.message;
    }
};

runSafe('git add .', 'git_add');
runSafe('git commit -m "Initial commit"', 'git_commit');
runSafe('gh repo create Prime-Ice-Pop-ECommerce --public --source=. --remote=origin --push', 'gh_repo');

fs.writeFileSync('push_out.json', JSON.stringify(out, null, 2));
