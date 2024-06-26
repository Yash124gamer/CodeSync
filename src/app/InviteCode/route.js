const inviteCodes = [];

// Function to generate a random alphanumeric string
const generateInviteCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let inviteCode = '';
    let isUnique = false;
  
    // Keep generating a new code until it's unique
    while (!isUnique) {
      inviteCode = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        inviteCode += characters.charAt(randomIndex);
      }
      // Check if the generated code already exists in the array
      if (!inviteCodes.includes(inviteCode)) {
        isUnique = true;
        inviteCodes.push(inviteCode);
      }
    }
    
    return inviteCode;
  };

  //API endpoint to generate a new Invite code and store it temporarly in the server 
export async function GET(request) {
    const code = generateInviteCode(8);
    return new Response(code);
}

//API endpoint to check if the Invite Code was generated by a user or not
export async function POST(request){
    const {code} = await request.json();
    return new Response(JSON.stringify({result : inviteCodes.includes(code)}));
}

//API endpont to Delete the Invite Code from the inviteCodes list in the Server
export async function DELETE(request){
    const {code} = await request.json();
    inviteCodes.splice(inviteCodes.indexOf(code) , 1);       //removing element from the inviteCodes list
    return new Response(JSON.stringify({response : true}), { status: 200 });
}