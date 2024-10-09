#include <bits/stdc++.h>
#define ll long long

using namespace std;
void kaushik176()
{
    int n;
    cin >> n;
    ll A = 0, G = 0;
    string ans = "";
    while (n--)
    {
        int a, g;
        cin >> a >> g;
        if (abs(A + a - G) > abs(G + g - A))
        {
            ans += "G";
            G += g;
        }
        else
        {
            ans += "A";
            A += a;
        }
    }
    if (abs(G - A) > 500)
        cout << "-1\n";
    else
        cout << ans << "\n";
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    kaushik176();
    return 0;
}